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
from caseflow.services import DMSConnector
from caseflow.utils.enums import DMSCode

from caseflow.utils import auth, cors_preflight
from caseflow.utils.enums import CaseflowRoles


# keeping the base path same for cmis operations (upload / download) as cmis/

API = Namespace("CASE", description="CRED Operations of a case")


@cors_preflight("GET,POST,PUT,DELETE,OPTIONS")
@API.route("/", methods=["POST","PUT","DELETE","OPTIONS"])
class CMISConnectorUploadResource(Resource):
    """Resource for uploading cms repo."""

    @staticmethod
    @auth.require
    @auth.has_role([CaseflowRoles.CASEFLOW_ADMINISTRATOR.value])
    def post():
        try:
            s =''
            
        except Exception as e:
            return {
                "message": "Unable to upload files in the request", "error" : e
            }, HTTPStatus.INTERNAL_SERVER_ERROR


    def put():
        try:
            s =''
        except Exception as e:
            return {
                "message": "Unable to  update the details", "error" : e
            }, HTTPStatus.INTERNAL_SERVER_ERROR



    def delete():
        try:
            s =''
        except Exception as e:
            return {
                "message": "Unable to  delete the case ", "error" : e
            }, HTTPStatus.INTERNAL_SERVER_ERROR




 