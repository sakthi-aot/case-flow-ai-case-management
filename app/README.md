
## Individual Service Deployment

### 1.caseflow_idm(Keycloak)

1.Make sure you have a Docker machine up and running.

2.Make sure your current working directory is cd {Your Directory}/caseflow-poci/caseflow-idm

3.Open the terminal and run docker-compose up -d

4.The application should be up and available for use in http://localhost:8085/

5.Default Credentials 

        Username:  admin
        Password:  changeme

6.Run docker-compose stop to stop the service.




### 2.caseflow-dms(Alfresco)

1.Make sure you have a Docker machine up and running.

2.Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-dms

3.Open the terminal and run docker-compose up -d

4.The application should be up and available for use in http://localhost:8080/

5.Default Credentials 

        Username:  admin
        Password:  admin

6.Run docker-compose stop to stop the service.

### 3.caseflow-api(Python Flask Api)

1.You can install and run it locally. Install [python](https://www.python.org/downloads/)

2.Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api

3.Open the terminal and run following commands

```bash
 python -m venv venv

 ./venv/Scripts/activate

 pip install -r requirements.txt

 flask run
```

6.The application should be up and available for use at port defaulted to 5000 in http://localhost:5000/

#### Stepzen Integration
1.Create an account on [StepZen](https://stepzen.com/)

2.Follow the instructions on [Stepzen Getting Started](https://stepzen.com/getting-started) page

2.Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-api/caseflow and run following commands in the terminal.

3.Enter the following command 
```bash
 stepzen import postgresql
```  
When prompted, enter your database credentials.

4.Enter the following command  

```bash
 stepzen start
``` 
5.Stepzen user interface will be available on http://localhost:5001/

6.Copy the stepzen endpoint shown in the terminal  and update STEPZEN_ENDPOINT_URL in the .env file 

7.Copy the API Key from stepzen [Account](https://dashboard.stepzen.com/account) and update   STEPZEN_API_KEY  in the .env file

8.To make this database available to other services outside your private network, you need to create a TCP tunnel. For this ngrok will be used:

Download [ngrok](https://ngrok.com/)

Run ngrok 

```bash
ngrok tcp [postgres port number]
```

Ngrok will return the forwarding address for the local PostgreSQL database, which will looks something like this: tcp://0.tcp.ngrok.io:15650.

Update base posgres URL with the ngrok URL



### 4.caseflow-web(React Application)

1.Make sure your current working directory is cd {Your Directory}/caseflow-poc/caseflow-web

3.Open the terminal and run following commands

```bash
npm install

npm start

```

6.The application should be up and available for use at port defaulted to 3000 in http://localhost:3000/







