
from typing import Dict
from datetime import date

class S3:
    """This class manages the connecton of S3 system with the API"""
    @staticmethod
    def doc_upload(document) -> Dict:
        try :
            formatted_document = {
                    "doc_id" : document.key,
                    "doc_name" : document.key,
                    "doc_type" : document.content_type,
                    "doc_size" : document.content_length,
                    "doc_description" : "",
                    "version" : document.version_id,
                    "doc_modified" :  document.last_modified.strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_created" : date.today().strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_download_url" : ""
            }
            return formatted_document

        except Exception as error:
            print('doc_upload failed to run :' + repr(error))
    
    @staticmethod
    def doc_update(document) -> Dict:
        try :

            formatted_document = {
                    "doc_id" : document.key,
                    "doc_name" : document.key,
                    "doc_type" : document.content_type,
                    "doc_size" : document.content_length,
                    "doc_description" : "",
                    "version" : document.version_id,
                    "doc_modified" :  document.last_modified.strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_created" : date.today().strftime("%Y-%m-%dT%H:%M:%S"),
                    "doc_download_url" : ""
            }
            return formatted_document

        except Exception as error:
            print('doc_update failed to run :' + repr(error))

