pipeline {
  agent any

  parameters {
    string(name: "DB_HOST", defaultValue: "154.56.61.109", description: "DB_HOST ?")
    string(name: "DB_USER", defaultValue: "devsys", description: "DB_USER ?")
    string(name: "DB_PASS", defaultValue: "devsys123", description: "DB_PASS ?")
    string(name: "PARAM_KEY_PASSWORD", defaultValue: "bni1234/", description: "PARAM_KEY_PASSWORD ?")
    string(name: "PARAM_MINIO_ACCESS_KEY", defaultValue: "bni1234/", description: "PARAM_MINIO_ACCESS_KEY ?")
    string(name: "PARAM_SECRET_KEY", defaultValue: "Nmwm5FjspMzIIuACbfek", description: "PARAM_SECRET_KEY ?")
    string(name: "SVC_MINIO", defaultValue: "http://bni-minio:9000", description: "SVC_MINIO ?")
    string(name: "PARAM_MINIO_BUCKET_NAME", defaultValue: "yourBucketName", description: "PARAM_MINIO_BUCKET_NAME ?")
    string(name: "HOST_JAEGER", defaultValue: "jaeger", description: "HOST_JAEGER ?")
  }
  options {
    disableConcurrentBuilds()
    timeout(time: 1, unit: 'HOURS')
  }

  stages {
    stage('Build & Deploy Containers') {
      stages {
        stage('Prepare Environment') {
            steps {
                sh "docker network create bni-net || true"
                sh "echo '' > .env"
                sh "echo DB_HOST=${params.DB_HOST} >> .env"
                sh "echo DB_USER=${params.DB_USER} >> .env"
                sh "echo DB_PASS=${params.DB_PASS} >> .env"
                sh "echo PARAM_KEY_PASSWORD=${params.PARAM_KEY_PASSWORD} >> .env"
                sh "echo PARAM_MINIO_ACCESS_KEY=${params.PARAM_MINIO_ACCESS_KEY} >> .env"
                sh "echo PARAM_SECRET_KEY=${params.PARAM_SECRET_KEY} >> .env"
                sh "echo SVC_MINIO=${params.SVC_MINIO} >> .env"
                sh "echo PARAM_MINIO_BUCKET_NAME=${params.PARAM_MINIO_BUCKET_NAME} >> .env"
                sh "echo HOST_JAEGER=${params.HOST_JAEGER} >> .env"

                sh "mv .env ./landingpage"
            }
        }

        stage('Done.') {
          steps {
            sleep 20
            sh "exit 0"  
          }
        }
      }
    }
  }
}