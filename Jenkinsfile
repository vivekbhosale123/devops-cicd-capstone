pipeline {
    agent any

    environment {
        DOCKERHUB_USERNAME = 'vivekbhosale123'
        IMAGE_NAME = 'vivekbhosale123/shop-app'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Unit Tests') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                echo 'SonarQube is running on port 9000.'
                echo 'Configure SonarQube Scanner and quality gate before enabling analysis.'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .'
            }
        }

        stage('Trivy Image Scan') {
            steps {
                sh 'trivy image --exit-code 1 --severity HIGH,CRITICAL ${IMAGE_NAME}:${IMAGE_TAG}'
            }
        }

        stage('Publish Image') {
            steps {
                echo 'Configure Docker Hub credentials in Jenkins before publishing.'
                // Add Docker Hub login and push after configuring credentials.
            }
        }

        stage('Deploy to Development') {
            steps {
                echo 'Configure Ansible inventory and SSH credentials before deployment.'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Configure staging inventory before deployment.'
            }
        }

        stage('Production Approval') {
            steps {
                input message: 'Approve deployment to Production?', ok: 'Deploy'
            }
        }

        stage('Deploy to Production') {
            steps {
                echo 'Configure production inventory before deployment.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check the stage logs.'
        }
        always {
            echo 'Pipeline execution finished.'
        }
    }
}

