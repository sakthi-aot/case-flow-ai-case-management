"""Common utils.

CORS pre-flight decorator. A simple decorator to add the options
method to a Request Class.
camel_to_snake - Converts camel case to snake case.
validate_sort_order_and_order_by - Utility function to validate
if sort order and sort order by is correct.
translate - Translate the response to provided language
"""
import re
from typing import Tuple

from .constants import (
    ALLOW_ALL_ORIGINS,
)
# from .enums import  FormioRoles


def cors_preflight(methods: str = "GET"):
    """Render an option method on the class."""

    def wrapper(f):  # pylint: disable=invalid-name
        def options(self, *args, **kwargs):  # pylint: disable=unused-argument
            return (
                {"Allow": "GET"},
                200,
                {
                    "Access-Control-Allow-Origin": ALLOW_ALL_ORIGINS,
                    "Access-Control-Allow-Methods": methods,
                    "Access-Control-Allow-Headers": "Authorization, Content-Type",
                },
            )

        setattr(f, "options", options)
        return f

    return wrapper


def camel_to_snake(name: str) -> str:
    """Convert camel case to snake case."""
    s_1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s_1).lower()




# def get_role_ids_from_user_groups(role_ids, user_role):
#     """Filters out formio role ids specific to user groups."""
#     if user_role is None or user_role is None:
#         raise ValueError("Inavlid arguments passed")

#     if DESIGNER_GROUP in user_role:
#         return role_ids
#     if REVIEWER_GROUP in user_role:
#         return filter_list_by_user_role(FormioRoles.REVIEWER.name, role_ids)
#     if CLIENT_GROUP in user_role:
#         return filter_list_by_user_role(FormioRoles.CLIENT.name, role_ids)
#     return None


def filter_list_by_user_role(formio_role, role_ids):
    """Iterate over role_ids and return entries with matching formio role."""
    return list(filter(lambda item: item["type"] == formio_role, role_ids))



