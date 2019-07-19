#!groovy

pipeline {

    agent {

        label 'cbo-jenkins'

    }

    parameters {
        choice(name: 'Build_Profile', choices: 'CI\nFull', description: 'Choose CI for compile/test/quality gates or Full for CI plus deploy.')
        booleanParam(defaultValue: true, description: 'Run step to upload package to UrbanCode deploy', name: 'Upload_Pkg_To_UrbanCode')
    }

    stages {

        stage('Debug') {
            steps {

                script {
                    echo '****** Debug Info ******'
                    echo 'Start list of changes in this build:'
                    sh 'git diff --name-only $GIT_PREVIOUS_COMMIT $GIT_COMMIT'
                    echo 'End list of changes in this build.'
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

        stage('SONAR') {

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

                        if(params.Build_Profile == 'CI') {

                            sh '''
                                pwd
                                cd /usr/src/app
                                npm run sonarqube -- -Dsonar.branch=CI_Master         
                            '''
                        } else {
                            sh '''
                                pwd
                                cd /usr/src/app
                                npm run sonarqube -- -Dsonar.branch=Master         
                            '''
                        }
                    }
                }
            }

        }

        stage('Build App') {

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
                //expression { env.BRANCH_NAME == "master" || env.BRANCH_NAME.startsWith("release-br") || env.BRANCH_NAME == "CBODIG-10206_Pipeline" }
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

                            //Code below works - commented out during development
                            //TODO: Uncomment lines below to upload to Nexus
                            //docker.withRegistry('https://registry.sbx.zone', 'registry.sbx.zone') {
                            //    dockerImage.push();
                            //}

                        } catch (e) {
                            echo "Failed to publish image ${props.name}:${props.version}-${env.BUILD_NUMBER}"
                            throw e
                        }

                        echo "Published Image ${props.name}:${props.version}-${env.BUILD_NUMBER}"

                    }
                }
            }
        }

        stage('DAST Test') {

            //TODO - Using hardcoded url for running DAST. This should be changed for Bluemix/Rancher url once
            // test code is deployed

            steps {

                script {

                    docker.withRegistry('https://combined-registry.sbx.zone', 'registry.sbx.zone') {
                        sh 'docker pull combined-registry.sbx.zone/owasp/zap2docker-weekly:latest'

                        sh """
                                            cd  ${WORKSPACE}/build-resources
                                            chmod u+x ./Zap.sh
                                            cd -
                                            ./build-resources/Zap.sh \
                                            "http://10.112.207.145:3000/" 
                                            pwd
                                        """

                        publishHTML(
                                [allowMissing         : false,
                                 alwaysLinkToLastBuild: false,
                                 keepAll              : false,
                                 reportDir            : 'zap-reports',
                                 reportFiles          : 'zap-report.html',
                                 reportName           : 'ZAP Report'])

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
