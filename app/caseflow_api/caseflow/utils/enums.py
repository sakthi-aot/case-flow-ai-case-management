"""Enum User Definition."""
from enum import Enum, unique


@unique
class FormioRoles(Enum):
    """Roles and corresponding machine names."""

    CLIENT = "formsflowClient"
    REVIEWER = "formsflowReviewer"
    DESIGNER = "administrator"
    ANONYMOUS = "anonymous"
    RESOURCE_ID = "RESOURCE_ID"

    @classmethod
    def contains(cls, item: str) -> bool:
        """Checks if the parameter exists in the enum."""
        return item in [entry.value for entry in cls]


