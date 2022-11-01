"""Enum User Definition."""
from enum import Enum, unique


@unique
class DMSCode(Enum):
    """DMS names and there corresponding codes"""

    DMS01 = 'alfresco'
    DMS02 = 'S3'
    DMS03 = 'Sharepoint'

@unique
class CaseflowRoles(Enum):
    """caseflow Roles"""
    
    CASEFLOW_ADMINISTRATOR = 'administrator'
    CASEFLOW_CLIENT = 'caseflowClient'





   




