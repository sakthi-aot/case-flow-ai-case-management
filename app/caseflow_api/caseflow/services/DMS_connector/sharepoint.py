
from typing import Dict


class Sharepoint:
    """This class manages the connecton of Sharepoint system with the API"""
    @staticmethod
    def doc_upload(document, DMS) -> Dict:
        try :

            #once the sharepoint is configured enter the connector code here

            return 0

        except Exception as error:
            print('doc_upload failed to run :' + repr(error))
    
    @staticmethod
    def doc_update(document) -> Dict:
        try :

            #once the sharepoint is configured enter the connector code here

            return 0

        except Exception as error:
            print('doc_update failed to run :' + repr(error))
