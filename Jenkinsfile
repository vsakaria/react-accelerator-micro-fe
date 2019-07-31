#!groovy

pipeline {

    agent {

        label 'cbo-jenkins'

    }

    parameters {
        choice(name: 'buildType', choices: "RELEASE\nANALYTICS\nINFOSERVICES\nINTEGRATION\nSECURITY\nTRANSACTING\nPERFORMANCE\nCMP\nTEAMTRAILBLAZER", description: 'Build type for feature toggle group settings')
        choice(name: 'Build_Profile', choices: 'CI\nFull', description: 'Choose CI for compile/test/quality gates or Full for CI plus deploy.')
        booleanParam(name: 'Upload_Pkg_To_UrbanCode', defaultValue: true, description: 'Run step to upload package to UrbanCode deploy')
    }

    stages {

        stage('Debug') {
            steps {

                script {
                    echo '****** Debug Info ******'
                    echo 'Start list of changes in this build:'
                    sh 'git diff --name-only $GIT_PREVIOUS_COMMIT $GIT_COMMIT'
                    echo 'End list of changes in this build.'
                    sh "echo Build type parameter ${params.buildType}"
                    sh "echo Build profile parameter ${params.Build_Profile}"
                    sh "echo Build going to upload to UC ${params.Upload_Pkg_To_UrbanCode}"

                    props = readJSON file: 'package.json'
                    echo "${props.name}:${props.version}"

                    echo '****** /Debug Info ******'
                }

            }
        }

        stage('Unit Test') {

            agent {

                dockerfile {
                    filename 'Dockerfile'
                    args '-p 3000:3000'
                    registryCredentialsId 'registry.sbx.zone'
                    registryUrl 'https://combined-registry.sbx.zone'
                    label 'cbo-jenkins'
                    reuseNode true

                }
            }

            steps {
                echo 'Running Unit Tests'
                script {

                    sh '''
                    pwd
                    mkdir jest-reports
                    cd /usr/src/app
                    npm run testCI
                    pwd
                    cd -
                    cp -r /usr/src/app/coverage/* jest-reports/
                    
                 '''

                    publishHTML(target:
                            [allowMissing         : false,
                             alwaysLinkToLastBuild: true,
                             keepAll              : true,
                             reportDir            : 'jest-reports/lcov-report',
                             reportFiles          : 'index.html',
                             reportName           : 'Jest Test Coverage Report'])

                    stash name: "JUNIT-REPORTS", includes: "jest-reports/**/*"

                }
            }
        }

        /*stage('SONAR') {

            agent {

                dockerfile {
                    filename 'Dockerfile'
                    args '-p 3000:3000'
                    registryCredentialsId 'registry.sbx.zone'
                    registryUrl 'https://combined-registry.sbx.zone'
                    label 'cbo-jenkins'
                    reuseNode true

                }
            }

            steps {

                withSonarQubeEnv('CBO SonarQube Server') {

                    script {
                        sh '''
                                pwd
                                cd /usr/src/app
                           '''
                        sh 'npm install sonarqube-scanner-node@0.0.10'
                        sh "npm run sonarqube -- -Dsonar.branch=${env.BRANCH_NAME}"
                    }
                }
            }

        }*/

        stage('Build App') {
            when {
                expression { env.BRANCH_NAME == "master" || env.BRANCH_NAME.startsWith("release-br")}
            }

            agent {

                dockerfile {
                    filename 'Dockerfile.production'
                    args '-p 3000:3000'
                    registryCredentialsId 'registry.sbx.zone'
                    registryUrl 'https://combined-registry.sbx.zone'
                    label 'cbo-jenkins'
                    reuseNode true

                }
            }

            steps {
                echo 'Building Production Docker Image'

                script {

                    if (params.Upload_Pkg_To_UrbanCode == true) {
                        echo "Stash CWA Code"

                        sh '''
                           pwd
                           mkdir cwa
                           cd /usr/share/nginx/
                           ls -l
                           pwd
                           cd -
                           cp -r /usr/share/nginx/* cwa/         
                        '''

                        stash name: "CWACode", includes: "cwa/**/*"
                    }
                }

            }

        }

        stage('Publish Image') {
            when {
                expression { env.BRANCH_NAME == "master" || env.BRANCH_NAME.startsWith("release-br")}
            }
            steps {

                dir("${WORKSPACE}") {
                    echo 'Building Docker Base Image for cwa'
                    script {

                        try {
                            def dockerImage
                            docker.withRegistry('https://combined-registry.sbx.zone', 'registry.sbx.zone') {
                                dockerImage = docker.build("${props.name}:${props.version}-${env.BUILD_NUMBER}", "-f Dockerfile.production --no-cache .")
                            }

                            docker.withRegistry('https://registry.sbx.zone', 'registry.sbx.zone') {
                                dockerImage.push();
                            }

                        } catch (e) {
                            echo "Failed to publish image ${props.name}:${props.version}-${env.BUILD_NUMBER}"
                            throw e
                        }

                        echo "Published Image ${props.name}:${props.version}-${env.BUILD_NUMBER}"

                    }
                }
            }
        }

        stage('UrbanCode') {
            agent {
                label "cbo-jenkins-aurora"
            }
            when {
                expression { env.BRANCH_NAME == "master" || env.BRANCH_NAME.startsWith("release-br") }
                expression { params.Upload_Pkg_To_UrbanCode == true }
                expression { params.Build_Profile != 'CI' }
            }
            steps {
                script {
                    echo 'On package upload to UC step.'
                    echo "Node name is ${NODE_NAME}."

                    echo "Un-stashing build artifact to upload to UrbanCode"
                    unstash 'CWACode'

                    withCredentials([string(credentialsId: 'ucd_token', variable: 'AUTH_TOKEN')]) {

                        sh """
                            cd  ${WORKSPACE}/
                            if [ -d \\"uc_deploy_basedir\\" ]; then
                                rm -rf uc_deploy_basedir
                            fi
                            mkdir uc_deploy_basedir
                            cd uc_deploy_basedir
                            cp -R ${WORKSPACE}/cwa/**/* .
                            cd ${WORKSPACE}
                            cp ${WORKSPACE}/build-resources/UrbanCode_client.sh .
                            chmod u+x ./UrbanCode_client.sh
                            ls -la ./UrbanCode_client.sh uc_deploy_basedir/
                            ./UrbanCode_client.sh \
                            "Digital - CBO - CCMI - CWA - ClientSummary" \
                            "TBT" \
                            "ClientSummaryCWA" \
                            "${params.buildType}_${BUILD_TAG}" \
                            "uc_deploy_basedir/" \
                            "${AUTH_TOKEN}"
                        """

                    }
                }
            }
        }

    }

    post {
        always {

            unstash "JUNIT-REPORTS"

            archiveArtifacts artifacts: 'jest-reports/**/*', allowEmptyArchive: false
            junit 'jest-reports/junit.xml'

            echo 'One way or another, I have finished'
            deleteDir() /* clean up our workspace */
        }
        success {
            echo 'I succeeded!'
        }
        unstable {
            echo 'I am unstable :/'
        }
        failure {
            echo 'I failed :('
        }
        changed {
            echo 'Things were different before...'
        }
    }

}
