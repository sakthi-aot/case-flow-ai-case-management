"""API endpoints for managing dms ."""


from http import HTTPStatus
from flask_restx import Namespace, Resource
from caseflow.services import DocManageService
from caseflow.utils import auth, cors_preflight




# keeping the base path same for cmis operations (upload / download) as cmis/

API = Namespace("DMS", description="Document Managment ")



@cors_preflight("GET,POST,OPTIONS")
@API.route("/doc_fetchdata", methods=["GET", "OPTIONS"])
class DocumentFetch(Resource):
    """Resource for fetch document list ."""

    @staticmethod
    @auth.require
    #@profiletime
    def get():
        """Getting document list ."""
        try:
            documentList = DocManageService.doc_fetch_alldata()
            return (
                (documentList),
                HTTPStatus.OK,
            )
        except Exception as e:
            return {
                    "message": "The Document List had some error"
                }, HTTPStatus.INTERNAL_SERVER_ERROR

