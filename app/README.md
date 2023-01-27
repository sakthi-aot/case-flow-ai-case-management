

# CASEFLOW Documentation For Application Installation

In the following document, we’ll describe about the different project dependencies, and the installation options being supported.


## Prerequisites
- For Docker-based installation [Docker](https://www.docker.com/) needs to be installed.
    + For Mac, make sure the [docker for mac](https://docs.docker.com/desktop/get-started/#resources) memory allocation is set to at least 16GB.


## Download the caseflow.ai
- Clone this github repo: https://github.com/AOT-Technologies/case-flow-ai
- Git repo contains 2 folders 

    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/Web%20and%20Core%20Folder%20Structure.jpg)
        
    

## Individual Service Deployment
- ### identity_ management_systems(Keycloak)
    - Make sure you have a Docker machine up and running.. 
    - Make sure your current working directory is cd {Your Directory}/case-flow-ai/caseflow_core/identity_ management_systems/keycloak
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
 
    

- ### document_management_systems(Alfresco)
    Make sure your current working directory is cd {Your Directory}/caseflow-ai/caseflow-core/document_management_systems/alfresco
    
   #### To start the Alfresco in local
    - Run `docker-compose up -d` to start

    #### To stop the Alfresco server
    - Run `docker-compose stop` to stop.    

        The application should be up and available for use in http://localhost:8080/
    
        #### Login Credentials : 
            Username : admin
            Password : admin

        ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/alfresco.png)
        
        
- ### caseflow Microservices
    Contains individual servers for the fucntionality
    
    
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-core-folder.jpg)



- ### dms 
    You can install it through locally or docker
    Make sure your current working directory is cd {Your Directory}/caseflow-ai/caseflow-core/dms     
    
    Make sure you have changed the below setting in app.module.ts inorder to enbale the playground in localhost:7002 , where you can test queries amd mutations 
    
   ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-dms-setting.png)
   
   NOTE: Revert the changes before pushing the code to Production
   
    #### To start the dms in local
    - Run `docker-compose up -d` to start  
    
        ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/dms-docker-compose.png)
    #### To stop the dms server
    - Run `docker-compose stop` to stop.    

     The application should be up and available for use in http://localhost:7002/
        
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/case-flow-dms-playground.png)
        
        
        
        
- ### server      

   You can install it through locally or docker
   Make sure your current working directory is cd {Your Directory}/caseflow-ai/caseflow-core/server     
    
   #### Make sure you have changed the below setting in app.module.ts inorder to enbale the playground in localhost:7001 , where you can test queries amd mutations
    
        
   ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-core-setting.png)
   
   
   NOTE: Revert the changes before pushing the code to Production
   
  #### To start the server in local
   - Run `docker-compose up -d` to start
    
    
   ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-core-docker-compose.png)
    #### To stop the  server
    - Run `docker-compose stop` to stop.    


     The application should be up and available for use in http://localhost:7001/
        
     ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-core-7001-graphql.png)
        
        
- ### gateway        

    You can install it through locally or docker
    Make sure your current working directory is cd {Your Directory}/caseflow-ai/caseflow-core/gateway     
    
    #### Make sure you have changed the below setting in app.module.ts inorder to enbale the playground in localhost:7000 , where you can test queries amd mutations
    
        
    ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-gateway-setting.png)
    
    
   NOTE: Revert the changes before pushing the code to Production
        
    
    Make sure your dms server and server is up and running in docker before starting the gateway service,Any error in either one of them will cause issue while            starting the gateway server
   
   #### To start the gateway in local
   - Run `docker-compose up -d` to start
    
    
   ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/casflow-gateway-service-docker-compose.png)
      
    #### To stop the  gateway
    - Run `docker-compose stop` to stop.    

    The application should be up and available for use in http://localhost:7000/
        
        
   ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-7000-playground.png)
            
    





- ## caseflow-web(React Application)

Make sure your current working directory is `cd {Your Directory}/caseflow-ai/caseflow-web`

#### Run the following command in terminal

- Modify the environment variable in .env

    #### Make sure you have changed the below setting in .env inorder to connect the web application with the locally hosted server
    
    
        #caseflow web Api End point
        REACT_APP_CASEFLOW_API_URL=http://localhost:7001
        REACT_APP_CASEFLOW_GRAPHQL_API_URL=http://localhost:7000
    
        
       
   
   NOTE: Revert the changes before pushing the code to Production     
        
- Run `docker-compose up -d` to start

NOTE: Use --build command with the start command to reflect any future .env / code changes eg :` docker-compose up --build -d`

 #### To stop the caseflow-web
- Run `docker-compose stop` to stop. 

 ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-web-starting-page.png)
 
 proceed with Get Started
 
  ![App Screenshot](https://github.com/AOT-Technologies/case-flow-ai/blob/staging/development/.images/caseflow-web-login-page.png)




The application should be up and available for use at port defaulted to 3000 in http://localhost:3000/

    
