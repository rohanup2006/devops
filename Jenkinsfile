pipeline {

    agent any

    stages {

        stage('Install Dependencies') {

            steps {

                echo 'Installing dependencies...'

                bat 'npm install'
            }
        }


        stage('Run Tests') {

            steps {

                echo 'Running student data tests...'

                bat 'npm test'
            }
        }


        stage('Build Status') {

            steps {

                echo 'Student JSON verification completed.'
            }
        }
    }


    post {

        success {

            echo 'BUILD SUCCESSFUL - Student data is valid.'
        }

        failure {

            echo 'BUILD FAILED - Student data validation failed.'
        }
    }
}
