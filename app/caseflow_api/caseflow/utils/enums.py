"""Enum User Definition."""
from enum import Enum, unique


@unique
class DMSCode(Enum):
    """DMS names and there corresponding codes"""

    DMS01 = 1 #alfresco
    DMS02 = 2 #S3
    DMS03 = 3 #Sharepoint

@unique
class CaseflowRoles(Enum):
    """caseflow Roles"""
    
    CASEFLOW_ADMINISTRATOR = 'administrator'
    CASEFLOW_CLIENT = 'caseflowClient'





   




