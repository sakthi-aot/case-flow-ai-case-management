

# CASEFLOW Documentation For Application Installation

In the following document, we’ll describe about the different project dependencies, and the installation options being supported.


## Prerequisites
- For Docker-based installation [Docker](https://www.docker.com/) needs to be installed.
    + For Mac, make sure the [docker for mac](https://docs.docker.com/desktop/get-started/#resources) memory allocation is set to at least 16GB.


## Download the caseflow.ai
- Clone this github repo: https://github.com/AOT-Technologies/case-flow-ai
- Git repo contains 4 folders 

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/folder-structure-caseflow.png)
        
    

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

    #### Create user in the keycloak admin 
    
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/adduser.png)
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/passwordset.png)
    

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



- ### Stepzen Integration
    1.Create an account on [StepZen](https://stepzen.com/)

    2.Follow the instructions on [Stepzen Getting Started](https://stepzen.com/getting-started) page

    2.Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api/caseflow and run following commands in the terminal.

    3.Run the command  `stepzen login` ( using the [account]( https://dashboard.stepzen.com/account) )



    4.Enter the following command  

    ```bash
    stepzen deploy
    stepzen start (To check the Query and mutations)
    ``` 
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen1.png)
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen2.png)




    5.Stepzen user interface will be available on http://localhost:5001/



- ### caseflow-api(Python Flask Api) 
    You can install it through locally or docker

    Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api      
    Make sure the following stepzen configurations steps are correct.

   

    1.Copy the stepzen endpoint and update STEPZEN_ENDPOINT_URL in the .env file 

    2.Copy the API Key from stepzen [Account](https://dashboard.stepzen.com/account) and update   STEPZEN_API_KEY  in the .env file

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen-env-config.png)
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen-api-auth.png)
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen-endpoint-url.png)
   

    3.To make this database available to other services outside your private network, you need to create a TCP tunnel. For this ngrok will be used:

    Download [ngrok](https://ngrok.com/)

    Run ngrok 

    ```bash
    ngrok tcp [postgres port number]
    ```

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/ngrok.png)
    

    Ngrok will return the forwarding address for the local PostgreSQL database, which will looks something like this: tcp://0.tcp.ngrok.io:15650.

    Update base posgres URL with the ngrok URL

    4. make sure the Config.yml file is updated(caseflow-poc -> caseflow-api -> caseflow ->config.yaml)

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/stepzen-config.png)
    

 #### To start the caseflow-api in Docker

- Run `docker-compose up -d` to start
    

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/case-flow-api-python.png)

    
- Modify the environment variable in .env

NOTE: Use --build command with the start command to reflect any future .env / code changes eg :` docker-compose up --build -d`

#### To stop the caseflow-api server
- Run `docker-compose stop` to stop. 

The application should be up and available for use at port defaulted to 5000 in http://localhost:5000/

  ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/case-flow-api-port5000.png)
    






- ## caseflow-web(React Application)

Make sure your current working directory is `cd {Your Directory}/caseflow-poc/caseflow-web`

#### Run the following command in terminal

- Modify the environment variable in .env
- Run `docker-compose up -d` to start

NOTE: Use --build command with the start command to reflect any future .env / code changes eg :` docker-compose up --build -d`

 #### To stop the caseflow-web
- Run `docker-compose stop` to stop. 




The application should be up and available for use at port defaulted to 3000 in http://localhost:3000/

Go to http://localhost:3000/private/upload for file upload

![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/web-login-page.png)
![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/upload%20success.png)

![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/update.png)
![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/downloads.png)






    
