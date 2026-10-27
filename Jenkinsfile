
pipeline {
    agent any

    environment {
        IMAGE_NAME  = 'vivekbhosale123/shop-app'
        IMAGE_TAG   = "${BUILD_NUMBER}"
        LOCAL_IMAGE = "shop-app:${BUILD_NUMBER}"
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
                echo 'SonarQube analysis is not configured yet.'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t "$LOCAL_IMAGE" .'
            }
        }

       stage('Trivy Image Scan') {
             steps {
               sh 'trivy image --timeout 10m --exit-code 1 --severity HIGH,CRITICAL shop-app:${BUILD_NUMBER}'
           }
        }

        stage('Publish Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_TOKEN'
                    )
                ]) {
                    sh '''
                        set +x
                        echo "$DOCKER_TOKEN" | docker login \
                          --username "$DOCKER_USER" \
                          --password-stdin

                        docker tag "$LOCAL_IMAGE" "$IMAGE_NAME:$IMAGE_TAG"
                        docker push "$IMAGE_NAME:$IMAGE_TAG"

                        docker logout
                    '''
                }
            }
        }

        stage('Deploy to Development') {
            steps {
                echo 'Deployment not configured yet.'
            }
        }

        stage('Deploy to Staging') {
            steps {
                echo 'Deployment not configured yet.'
            }
        }

        stage('Production Approval') {
    when {
        branch 'main'
    }
    steps {
        timeout(time: 30, unit: 'MINUTES') {
            input(
                message: 'Approve deployment to Production?',
                ok: 'Approve Production'
            )
        }
    }
}

        stage('Deploy to Production') {
            steps {
                echo 'Production deployment not configured yet.'
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
