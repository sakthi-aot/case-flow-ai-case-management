import json
import requests
from typing import Dict
from flask import current_app
from datetime import datetime


class DocManageService:
    """This class manages doc service."""
    @staticmethod
    def doc_upload_mutation(request,document)-> Dict:
        """ Do upload document """

        stepzen_endpoint_url =current_app.config.get("STEPZEN_ENDPOINT_URL")  
        stepzen_api_key =current_app.config.get("STEPZEN_API_KEY") 
        doc_id = document['entry']['id']
        doc_name = document['entry']['name']
        doc_type = document['entry']['content']['mimeType']
        doc_size = document['entry']['content']['sizeInBytes']
        doc_description=document['entry']['properties']['cm:description']
        doc_versionType=document['entry']['properties']['cm:versionType']
        version=document['entry']['properties']['cm:versionLabel']
        doc_version='[{ name: "version", field:"'+ version+'" }]'
        doc_modified_date=document['entry']['modifiedAt']
        doc_created_date=document['entry']['createdAt']
        doc_modifiedObj = datetime.strptime(doc_modified_date, '%Y-%m-%dT%H:%M:%S.%f+0000')
        doc_createdObj = datetime.strptime(doc_created_date, '%Y-%m-%dT%H:%M:%S.%f+0000')
        doc_modified = doc_modifiedObj.strftime("%Y-%m-%dT%H:%M:%S")
        doc_created = doc_createdObj.strftime("%Y-%m-%dT%H:%M:%S")
    
        query = """mutation insertDocument {
        insertDocument(
            documentid: "%s"
            content: "nil"
            contentsize: %s
            contenttype: "%s"
            creationdate: "%s"
            creationuser: "%s"
            description: "%s"
            downloadurl: "%s"
            latestversion: "%s"
            metadata: "nil"
            modificationuser: "%s"
            name: "%s"
            modificationdate: "%s"
        ) {
            id,
            documentid
        }
        }

        #     """ % (doc_id,doc_size,doc_type,doc_created,doc_name,doc_description,doc_name,version,doc_name,doc_name,doc_modified)

        print(query)
        variables = {}
        try:
            headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
            r = requests.post(stepzen_endpoint_url, json={'query': query, 'variables': variables}, headers=headers)
            data = r.json()
            documentInsertedID=data['data']['insertDocument']['id']
            if(documentInsertedID):
                queryVersion = """mutation insertVersions {
                insertVersions(
                docid: %s
                versions:"%s"
                documentid:"%s"
                modificationdate: "%s"
                creationdate: "%s"
                ) {
                id,
                documentid
                }
                }
                
        #     """ % (documentInsertedID,version,doc_id,doc_modified,doc_created)


                #variables = {"docid": documentInsertedID,"versions": version,"modificationdate": doc_modified,"creationdate": doc_created}
                headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
                res = requests.post(stepzen_endpoint_url, json={'query': queryVersion}, headers=headers)
                dataversion = res.json()

                response = {
                    "message": data,
                    "status": "success",
                } 
        except TypeError as insertion_error:
            response = {
                "status": "error",
                "error": insertion_error,
            }    
        return response


    @staticmethod
    def doc_update_mutation(doc_id,document):
        """ Do Update document """
        stepzen_endpoint_url =current_app.config.get("STEPZEN_ENDPOINT_URL")  
        stepzen_api_key =current_app.config.get("STEPZEN_API_KEY") 

        query = """
        query getDocument($id: Int!){
            getDocument(id: $id){
                documentid
                
            }
        }
            """
        variables = {"id": doc_id}
        headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
        r = requests.post(stepzen_endpoint_url, json={'query': query, 'variables': variables}, headers=headers)
        data = r.json()
        documentId=data['data']['getDocument']['documentid']

        doc_name = document['entry']['name']
        doc_type = document['entry']['content']['mimeType']
        doc_size = document['entry']['content']['sizeInBytes']
        description=document['entry']['properties']['cm:description']
        version=document['entry']['properties']['cm:versionLabel']
        doc_version='{ name: "version", field:"'+ version+'" }'
       #doc_version={ 'name': 'version', 'field':'version' }
        doc_modified_date=document['entry']['modifiedAt']
        doc_modifiedObj = datetime.strptime(doc_modified_date, '%Y-%m-%dT%H:%M:%S.%f+0000')
        doc_modified = doc_modifiedObj.strftime("%Y-%m-%dT%H:%M:%S")
        

        query = """mutation updateDocument {
        updateDocument(
            documentid: "%s"
            name: "%s"
            contentsize: %s
            contenttype: "%s"
            creationuser: "%s"
            description: "%s"
            downloadurl: "%s"
            latestversion: "%s"
            modificationdate: "%s"
            modificationuser: "%s"
    
        ) {
            documentid,
            id
        }
        }

        #     """ % (documentId,doc_name,doc_size,doc_type,doc_name,description,doc_name,version,doc_modified,doc_name)


        variables = {}
        try:
            headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
            r = requests.post(stepzen_endpoint_url, json={'query': query, 'variables': variables}, headers=headers)
            data = r.json()
            #documentInsertedID=data['data']['updateDocument']['id']

            queryVersion = """mutation insertVersions {
                insertVersions(
                docid: %s
                versions:"%s"
                documentid:"%s"
                modificationdate: "%s"
                creationdate: "%s"
                ) {
                id
                }
                }
                
            #     """ % (doc_id,version,documentId,doc_modified,doc_modified)

                #variables = {"docid": documentInsertedID,"versions": version,"modificationdate": doc_modified,"creationdate": doc_created}
            headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
            res = requests.post(stepzen_endpoint_url, json={'query': queryVersion}, headers=headers)
            dataversion = res.json()

            response = {
                    "message": dataversion,
                    "status": "success",
            } 

            print(data)
        except TypeError as update_error:
            response = {
                "message": "Updation Error",
                "error": update_error,
            }    
        return response

    @staticmethod
    def fetchDocId(documetId):
        """ fetch id from  document by documentid """
        stepzen_endpoint_url =current_app.config.get("STEPZEN_ENDPOINT_URL")  
        stepzen_api_key =current_app.config.get("STEPZEN_API_KEY") 
        query = """
        query getDocument($id: Int!){
            getDocument(id: $id){
                documentid
                
            }
        }
            """
        variables = {"id": documetId}
        try:
            print(query)
            headers = {"Content-Type": "application/json", "Authorization": "Apikey "+stepzen_api_key}
            r = requests.post(stepzen_endpoint_url, json={'query': query, 'variables': variables}, headers=headers)
            data = r.json()
            documentId=data['data']['getDocument']['documentid']
            response = {
                    "message": documentId,
                    "status": "success",
            } 
        except TypeError as update_error:
            response = {
                "message": "documentid fetch Error",
                "error": update_error,
            }    
        return response    
     