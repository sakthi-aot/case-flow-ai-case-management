"""Enum User Definition."""
from enum import Enum, unique


@unique
class DMSCode(Enum):
    """DMS names and there corresponding codes"""

    DMS01 = 'alfresco'
    DMS02 = 'S3'
    DMS03 = 'Sharepoint'


   




