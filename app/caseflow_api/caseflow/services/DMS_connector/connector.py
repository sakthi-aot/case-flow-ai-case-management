
from typing import Dict
from caseflow.services.DMS_connector.alfresco import Alfresco
from caseflow.services.DMS_connector.s3 import S3
from caseflow.services.DMS_connector.sharepoint import Sharepoint
from caseflow.utils.enums import DMSCode


class DMSConnector:
    """This class manages the connecton various DMS system with the API"""

    @staticmethod
    def doc_upload_connector(document, DMS,content_data) -> Dict:
        # DMS connector for the document upload API
        try :
            if DMS == DMSCode.DMS01.value :
                #  If the DMS system is alfresco following code is executed

                return Alfresco.doc_upload(document,content_data)

            elif DMS == DMSCode.DMS02.value :
                #  If the DMS system is S3 following code is executed

                return S3.doc_upload(document,content_data)

            elif DMS == DMSCode.DMS03.value :
                #  If the DMS system is Sharepoint following code is executed

                return Sharepoint.doc_upload(document,content_data)

            else :
                raise Exception('The given DMS is not configured')

        except Exception as error:
            print('doc_upload_connector failed to run :' + repr(error))


    @staticmethod
    def doc_update_connector(document, DMS) -> Dict:
        # DMS connector for the document update API
        try :
            if DMS == DMSCode.DMS01.value :
                #  If the DMS system is alfresco following code is executed

                return Alfresco.doc_update(document)

            elif DMS == DMSCode.DMS02.value :
                #  If the DMS system is S3 following code is executed

                return S3.doc_update(document)

            elif DMS == DMSCode.DMS03.value :
                #  If the DMS system is Sharepoint following code is executed

                return Sharepoint.doc_update(document)

            else :
                raise Exception('The given DMS is not configured')

        except Exception as error:
            print('doc_update failed to run :' + repr(error))
