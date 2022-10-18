
# CASEFLOW Documentation For Application Installation

In the following document, we’ll describe about the different project dependencies, and the installation options being supported.


## Prerequisites
- For Docker-based installation [Docker](https://www.docker.com/) needs to be installed.
    + For Mac, make sure the [docker for mac](https://docs.docker.com/desktop/get-started/#resources) memory allocation is set to at least 16GB.


## Download the caseflow.ai
- Clone this github repo: https://github.com/AOT-Technologies/case-flow-ai
- Git repo contains 4 folders 

    ![App Screenshot]()
        
    

## Individual Service Deployment
- ### caseflow_idm(Keycloak)
    - Make sure you have a Docker machine up and running.. 
    - Make sure your current working directory is cd {Your Directory}/caseflow-poci/caseflow-idm
    #### To start Keycloak server     
    - Run  `docker-compose up -d to start.`
    
     ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/keyclock.png)
    
    NOTE: Use --build command with the start command to reflect any future changes eg : `docker-compose up --build -d`

    #### To stop the keycloak server
    - Run `docker-compose stop` to stop.
    The application should be up and available for use in http://localhost:8085/

    #### Login Credentials :

    Username : admin 

    Password : changeme

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/kclogin.png)
    

- ### caseflow-dms(Alfresco)
    Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-dms
    
   #### To start the Alfresco in local
    - Run `docker-compose up -d` to start

        ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/dms.png)
    #### To stop the Alfresco server
    - Run `docker-compose stop` to stop.    

        The application should be up and available for use in http://localhost:8080/
    
        #### Login Credentials : 
            Username : admin
            Password : admin

        ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/alfresco.png)

- ### caseflow-api(Python Flask Api) 
    You can install it through locally. 

    Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api      

     #### To start the caseflow-api in local
    - Run `docker-compose up -d` to start

        ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/case-flow-api-python.png)

    #### To stop the caseflow-api server
    - Run `docker-compose stop` to stop. 

    The application should be up and available for use at port defaulted to 5000 in http://localhost:5000/

## Stepzen Integration    
We integrate Stepzen Inside the caseflow-api folder.
Folder structure will look like below:

![App Screenshot]()

Inside caseflow-poc -> caseflow-api -> caseflow

    - Config.yaml
    - Index.graphql
    - Stepzen.config.json
    - models/

These files are used for stepzen integration

### Config.yml
    
 ![App Screenshot]()

  
Will start the e PostgreSQL server, makes it available on port 5433 .

To make this database available to other services outside your private network, you need to create a TCP tunnel. For this ngrok will be used:

`ngrok tcp 5433`

![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/ngrok.png)

Ngrok will return the forwarding address for the local PostgreSQL database, which will looks something like this: `tcp://0.tcp.ngrok.io:15650`.

You need to add this to the file  config.yaml and also the postgress dbname,username and password for connection

### stepzen.config.json

![App Screenshot]()

Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api/caseflow

 #### Run the command in terminal :
- For  install the StepZen CLI  : `npm install -g stepzen`
- `stepzen deploy`

Make sure your  endpoint is correct. We get the endpoint from the stepzen dashboard

https://dashboard.stepzen.com/

    
![App Screenshot]()

Make sure your stepzen configurations in the env file  are correct

### Stepzen  configuration

    STEPZEN_ENDPOINT_URL=https://mengyin.stepzen.net/api/caseflow/__graphql

    STEPZEN_API_KEY=mengyin::stepzen.net+1000::7cc40bf956080cda64b432f54c34f1120206ad47b67ded6ad4fcb014e1b54d0d

We get the endpoint from the URL

![App Screenshot]()

API Key from  https://dashboard.stepzen.com/account

![App Screenshot]()

To check the Query,Mutation etc we need to run stepzen

Make sure your current working directory is cd `{Your Directory}/caseflow-poc/caseflow-api/caseflow`

#### Run the command in terminal
    Stepzen start

![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen2.png)

The application should be up and available for use at port defaulted to 5001 in http://localhost:5001/



![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen.png)

- ## caseflow-web(React Application)

Make sure your current working directory is `cd {Your Directory}/caseflow-poc/caseflow-web`

#### Run the following command in terminal

    npm install
    npm start

The application should be up and available for use at port defaulted to 3000 in http://localhost:3000/

Go to http://localhost:3000/private/upload for file upload

![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/upload%20success.png)




    
