"""API endpoints for managing cms repo."""
from email import header
import mimetypes
from http import HTTPStatus
import json
import requests
from cmislib.exceptions import UpdateConflictException
from flask import current_app, request,make_response,Response
from flask_restx import Namespace, Resource
from requests.auth import HTTPBasicAuth
from caseflow.services import DocManageService
from caseflow.utils import auth, cors_preflight
from share_point_helper import SharePoint


# keeping the base path same for cmis operations (upload / download) as cmis/

API = Namespace("CMIS", description="CMIS Connector")

@cors_preflight("GET,POST,OPTIONS")
@API.route("/upload", methods=["POST", "OPTIONS"])
class CMISConnectorUploadResource(Resource):
    """Resource for uploading cms repo."""

    @staticmethod
    @auth.require
    def post():
        
        if "upload" not in request.files:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

        content_file = request.files["upload"]
        file_name = content_file.filename
        data =content_file.read()   
        SHARE_POINT_FOLDER_NAME  = current_app.config.get("SHARE_POINT_FOLDER_NAME")   
        if file_name != "":
            try:
               
                document = SharePoint.upload_file(file_name,SHARE_POINT_FOLDER_NAME,data)
                if document.ok:
                    response = {}
                    file_url = f"/sites/team/Shared Documents/{SHARE_POINT_FOLDER_NAME} {file_name}"
                    uploaded_data = DocManageService.doc_upload_mutation(request,response)
                    print("Upload completed successfully!")
                    if uploaded_data['status']=="success":
                        return (
                            (uploaded_data),HTTPStatus.OK,
                        )
                    else:
            
                     document = SharePoint.delete_file(file_url)
                     document_content = document.json()
                     print(document_content)
                else:
                    print("Something went wrong!")

            except Exception as e:
                return {
                    "message": "Unable to  upload files in the request", "error" : e.message
                }, HTTPStatus.INTERNAL_SERVER_ERROR
        else:
            return {"message": "Unable to  upload files in the request"}, HTTPStatus.BAD_REQUEST


@cors_preflight("GET,POST,OPTIONS,PUT")
@API.route("/update", methods=["PUT", "OPTIONS"])
class CMISConnectorUploadResource(Resource):
    """Resource for uploading cms repo."""

    @staticmethod
    @auth.require

    def put():       
        if "upload" not in request.files:
            return {"message": "No upload files in the request"}, HTTPStatus.BAD_REQUEST

        content_file = request.files["upload"]
        args = request.args
        filename = content_file.filename
        data =content_file.read()    
        documentId = args.get("id")
        if filename != "":
            try:
               
                document = SharePoint.update_file(filename,data)
                if document.ok:
                    response = {}
                    uploaded_data = DocManageService.doc_update_mutation(documentId,response)
                    print("Upload completed successfully!")
                    if uploaded_data['status']=="success":
                        return (
                            (uploaded_data),HTTPStatus.OK,
                        )
                    else:
            
                     document = SharePoint.delete_file(document.serverRelativeUrl)
                     document_content = document.json()
                     print(document_content)
                else:
                    print("Something went wrong!")

            except Exception as e:
                return {
                    "message": "Unable to  upload files in the request", "error" : e.message
                }, HTTPStatus.INTERNAL_SERVER_ERROR
        else:
            return {"message": "Unable to  upload files in the request"}, HTTPStatus.BAD_REQUEST    


@cors_preflight("GET,POST,OPTIONS")
@API.route("/download", methods=["GET", "OPTIONS"])
class CMISConnectorDownloadResource(Resource):
    """Resource for downloading files from cms repo."""

    @staticmethod
    @auth.require
    def get():
        """Getting resource from cms repo."""
        
        args = request.args
        documentId = args.get("id")        
        try:
            doc_data = DocManageService.fetchDocId(documentId)
            if doc_data['status']=="success":
                doc_name=doc_data['message']
                
                final_document = SharePoint.download_file()
                return Response(final_document.content,mimetype='application/octet-stream')
                # return send_file(document,attachment_filename='capsule.zip', as_attachment=True),HTTPStatus.OK,
            else:
                 return {"message": "No file data found in DB"}, HTTPStatus.INTERNAL_SERVER_ERROR   
        except Exception as e:
                return {
                    "message": "Unable to  upload files in the request", "error" : e.message
                }, HTTPStatus.INTERNAL_SERVER_ERROR