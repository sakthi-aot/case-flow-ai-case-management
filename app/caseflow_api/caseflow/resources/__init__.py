from flask_restx import Api
from caseflow.resources.doc_manage_rest_api import API as DOC_ALFRESCO_API
from caseflow.resources.doc_manage_s3 import API as DOC_S3_API
from caseflow.resources.doc_manage_share_point import API as DOC_SHAREPOINT_API
from caseflow.resources.case_manage import API as CASE_API
from caseflow.resources.doc_manage import API as DOC_API


AUTHORIZATIONS = {"apikey": {"type": "apiKey", "in": "header", "name": "Authorization"}}

API = Api(
    title="caseflow.ai API",
    version="1.0",
    description="The API for caseflow.ai. Checkout: caseflow.ai to know more",
    # security=["apikey"],
    authorizations=AUTHORIZATIONS,
    doc="/",
)


API.add_namespace(DOC_ALFRESCO_API, path="/doc/dms01")
API.add_namespace(DOC_S3_API, path="/doc/dms02")
API.add_namespace(DOC_SHAREPOINT_API, path="/doc/dms03")
API.add_namespace(CASE_API, path="/case")
API.add_namespace(DOC_API, path="/doc")