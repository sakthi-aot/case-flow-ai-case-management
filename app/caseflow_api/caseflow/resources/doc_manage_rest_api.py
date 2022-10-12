"""API endpoints for managing cms repo."""

import base64
from email import header
import mimetypes
from http import HTTPStatus
import json
from xml.dom.minidom import Document
import requests
from cmislib.exceptions import UpdateConflictException
from cmislib.model import CmisClient
from flask import current_app, request,make_response,Response
from flask_restx import Namespace, Resource
from requests.auth import HTTPBasicAuth
from caseflow.services import DocManageService
from io import StringIO 
import base64

# from caseflow.services.external.cmislib.atompub.binding import (
#     AtomPubBinding,
# )
from caseflow.utils import auth, cors_preflight


# keeping the base path same for cmis operations (upload / download) as cmis/

API = Namespace("CMIS", description="CMIS Connector")


@cors_preflight("GET,POST,OPTIONS")
@API.route("/upload", methods=["POST", "OPTIONS"])
class CMISConnectorUploadResource(Resource):
    """Resource for uploading cms repo."""

    @staticmethod
    @auth.require
    # @profiletime
    def post():
        """New entry in cms repo with the new resource."""
        # cms_repo_url='http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom'
        # cms_repo_username='admin'
        # cms_repo_password="admin"
        # print(cms_repo_password)
        # print(current_app.config)
        cms_repo_url = current_app.config.get("CMS_REPO_URL") 
        cms_repo_username =current_app.config.get("CMS_REPO_USERNAME")  
        cms_repo_password =current_app.config.get("CMS_REPO_PASSWORD") 
        # print(cms_repo_password)
        if cms_repo_url is None:
            return {
                "message": "CMS Repo Url is not configured"
            }, HTTPStatus.INTERNAL_SERVER_ERROR

       
        if "upload" not in request.files:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

        contentfile = request.files["upload"]
        filename = contentfile.filename
        files = {'filedata': contentfile.read()}
        if filename != "":
            try:
                url = cms_repo_url + "1/nodes/-root-/children"
                document = requests.post(
                    url,data = request.form,files= files,auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
                )
                #document = response.json()
                response = json.loads(document.text)
                print(response['entry']['properties'])
                print(response['entry']['properties']['cm:description'])
             
                if document.ok:
                    uploadeddata = DocManageService.doc_upload_mutation(request,response)
                    print("Upload completed successfully!")
                    if uploadeddata['status']=="success":
                        return (
                            (uploadeddata),HTTPStatus.OK,
                        )
                    else:
                     url = cms_repo_url + "1/nodes/"+response['entry']['id']
                     document = requests.delete(url,auth=HTTPBasicAuth(cms_repo_username, cms_repo_password))
                     documentContent = document.json()
                     print(documentContent)
                else:
                    print("Something went wrong!")
            except UpdateConflictException:
                return {
                    "message": "The uploaded file already existing in the repository"
                }, HTTPStatus.INTERNAL_SERVER_ERROR
        else:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

            
 
        

@cors_preflight("GET,POST,OPTIONS")
@API.route("/update", methods=["PUT", "OPTIONS"])
class CMISConnectorUploadResource(Resource):
    """Resource for uploading cms repo."""

    @staticmethod
    @auth.require
    # @profiletime
    def put():
        """New entry in cms repo with the new resource."""
        # cms_repo_url='http://localhost:8080/alfresco/api/-default-/public/cmis/versions/1.1/atom'
        # cms_repo_username='admin'
        # cms_repo_password="admin"
        # print(cms_repo_password)
        # print(current_app.config)
        cms_repo_url = current_app.config.get("CMS_REPO_URL") 
        cms_repo_username =current_app.config.get("CMS_REPO_USERNAME")  
        cms_repo_password =current_app.config.get("CMS_REPO_PASSWORD") 
        # print(cms_repo_password)
        if cms_repo_url is None:
            return {
                "message": "CMS Repo Url is not configured"
            }, HTTPStatus.INTERNAL_SERVER_ERROR

       
        if "upload" not in request.files:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

        contentfile = request.files["upload"]
        filename = contentfile.filename
        content_type = mimetypes.guess_type(filename)[0]
        file_content =  contentfile.read()
        files = {'file': (filename, file_content)}
        request_data = request.form.to_dict(flat=True)
        params = {
            "majorVersion" : request_data["majorVersion"],
            "comment" :request_data["comment"],
            "name" :request_data["name"]
        }
        headers = {}
        headers["Content-Type"] = ""
        if filename != "":
            try:
                url = cms_repo_url + "1/nodes/" + request_data["id"] + '/content'
                document = requests.put(
                    url,files=files,params=params,headers = headers,auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
                )
                # document = response.json()
                response = json.loads(document.text)
                if document.ok:
                    uploadeddata = DocManageService.doc_update_mutation(request,response)
                    print("Upload completed successfully!")
                    return (
                        (
                            {  
                                "objectId": response['entry']['id'],
                                "name": response['entry']['name'],
                                
                            }
                        ),
                        HTTPStatus.OK,
                    )
                else:
                    print("Something went wrong!")
                print(document)
                return (
                    (document
                    ),
                    HTTPStatus.OK,
                )
            except UpdateConflictException:
                return {
                    "message": "The uploaded file already existing in the repository"
                }, HTTPStatus.INTERNAL_SERVER_ERROR
        else:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST
       


@cors_preflight("GET,POST,OPTIONS")
@API.route("/download", methods=["GET", "OPTIONS"])
class CMISConnectorDownloadResource(Resource):
    """Resource for downloading files from cms repo."""

    @staticmethod
    @auth.require
    # @profiletime
    def get():
        """Getting resource from cms repo."""
        cms_repo_url = current_app.config.get("CMS_REPO_URL")
        cms_repo_username = current_app.config.get("CMS_REPO_USERNAME")
        cms_repo_password = current_app.config.get("CMS_REPO_PASSWORD")
        if cms_repo_url is None:
            return {
                "message": "CMS Repo Url is not configured"
            }, HTTPStatus.INTERNAL_SERVER_ERROR

        
        args = request.args
        documentId = args.get("id")
        try:
            docData = DocManageService.fetchDocId(documentId)
            if docData['status']=="success":
                docId=docData['message']
                primaryUrl =cms_repo_url + "1/downloads"
                payload = {"nodeIds":[documentId]}
                headers = {"Content-type" : "application/json"}
                response = requests.post(
                        primaryUrl,json = payload,headers = headers,auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
                    )
                document = response.json()
                downloadPendingData = document["entry"]
                url = cms_repo_url + "1/downloads/"+downloadPendingData['id']
                prepared_document = requests.get(
                        url, auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
                    )
                prepare_url = cms_repo_url + "1/nodes/"+downloadPendingData['id']+"/content"
                final_document = requests.get(
                        prepare_url, auth=HTTPBasicAuth(cms_repo_username, cms_repo_password)
                    )
                print(final_document)
                resp = make_response(final_document.content)
                # resp.headers['Content-Type'] = 'application/zip;charset=UTF-8'
                resp.headers['Content-Disposition'] = 'attachment;filename='+str(docId)+'.zip'
                # return resp
                return Response(final_document.content,mimetype='application/octet-stream')
                # return send_file(document,attachment_filename='capsule.zip', as_attachment=True),HTTPStatus.OK,
            else:
                 return {"message": "No file data found in DB"}, HTTPStatus.INTERNAL_SERVER_ERROR   
        except AssertionError:
            return {"message": "No file data found"}, HTTPStatus.INTERNAL_SERVER_ERROR
        except BaseException as exc:  # pylint: disable=broad-except
            current_app.logger.warning(exc)
            return {
                "message": "CMS Repo related Exception occurred"
            }, HTTPStatus.INTERNAL_SERVER_ERROR
