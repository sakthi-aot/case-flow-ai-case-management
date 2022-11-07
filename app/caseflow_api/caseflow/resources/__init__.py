from flask_restx import Api
from caseflow.resources.doc_manage_rest_api import API as DOC_ALFRESCO_API
from caseflow.resources.doc_manage_s3 import API as DOC_S3_API


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