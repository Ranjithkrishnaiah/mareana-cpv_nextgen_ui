//CI-CD script---
pipeline {
    environment {
        DOCKER_IMAGE = 'registry.mareana.com/bms/dev'
    }
    agent { label 'cpv_node' } 
    stages {
     //stage('Checkout SCM') {
    //    steps {
  //            git branch: 'master', credentialsId: 'b7fc056f-aa79-44ba-ae9a-616535d691dd', url: 'git@bitbucket.org:qmareanateam/cpvui.git'
       // }
    //}
    stage("Installing Pre-requisites") {
         
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
               
                  sh '''#!/bin/bash -x
                        curl -sL https://rpm.nodesource.com/setup_12.x | sudo bash -
                        sudo yum install -y nodejs install gcc-c++ make xorg-x11-server-Xvfb gtk2-devel gtk3-devel libnotify-devel GConf2 nss libXScrnSaver alsa-lib
                        node --version
                        npm --version
                 '''       
                }
              }
           }  
    stage("Code Coverage") {
         
            steps {
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
               
                  sh '''#!/bin/bash -x
                        npm install 
                        npm install cypress --save-dev
                        npm run cypress:run
                        ls coverage
                 '''       
                }
              }
           }  
      stage('Sonarqube Analysis') {
        environment {
           scannerHome = tool 'SonarQubeScanner'
      }    
       steps {
            withSonarQubeEnv('sonar') {
           sh "${scannerHome}/bin/sonar-scanner"
         }
      }
    }
    
     
      stage("Quality Gate Status Check") {
             
            steps {
                 catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                  sh '''#!/bin/bash -x
                        STATUS="$(curl -s -u admin:Mzreana@190$  https://sonarqube.cloud.mareana.com/api/qualitygates/project_status?projectKey=project:mdh_cpv_ui)"
                        if [[ $STATUS = *"\\"status\\":\\"ERROR\\""* ]]; then
  	                    echo "Quality Gates Failed for Project mdh_cpv_ui hence aborting the pipeline"
                        exit 1
                        else
                        echo "Quality Gates Passed"
                        fi'''       
                }
              }
           }
          stage("Build Docker Image") {
            steps {
                sh 'sudo docker build -t  $DOCKER_IMAGE/mdh-cpv-ui-$BUILD_NUMBER:latest --no-cache .'
                }
              }
          stage("Push Docker Image to Docker Registry") {
            steps {
                withDockerRegistry(credentialsId: 'docker-registry-mareana', url: 'https://registry.mareana.com') {
                sh 'docker push $DOCKER_IMAGE/mdh-cpv-ui-$BUILD_NUMBER:latest'
                sh 'docker rmi $DOCKER_IMAGE/mdh-cpv-ui-$BUILD_NUMBER:latest'
                }
            }
          }
          stage("Deploy to Dev") {
              steps {
                  withAWS(credentials: 'AWS-eks-cred', region: 'us-east-2') {
                 sh 'aws --version'
                 sh 'aws eks update-kubeconfig --name MareanaEks-ControlPlane --region us-east-2'
                 sh '''#!/bin/bash -x
                       echo "Changing Docker image in deployment yml file"
                       sed -i -e "s@IMAGE@\'"$DOCKER_IMAGE/mdh-cpv-ui-$BUILD_NUMBER"\'@g"  bms-k8s-dev-deployment.yml
                       echo "Deploying the latest docker image to dev"
                       kubectl apply -f bms-k8s-dev-deployment.yml --record
                       kubectl -n bms-dev get pods
                       kubectl -n bms-dev rollout history deployments.v1.apps/cpv-nextgen-ui
                    '''
                 }
                 }
            }
    }
}

