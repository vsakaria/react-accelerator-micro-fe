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
                    args '-p 3000:3000 --no-cache'
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
                    npm test
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

                        sh '''
                            pwd
                            cd /usr/src/app
                            npm run sonarqube           
                        '''
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
