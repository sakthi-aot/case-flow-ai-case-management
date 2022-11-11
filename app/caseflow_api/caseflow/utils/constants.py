"""All constants for project."""
import os

from dotenv import find_dotenv, load_dotenv

# this will load all the envars from a .env file located in the project root (api)
load_dotenv(find_dotenv())

CASEFLOW_API_CORS_ORIGINS = os.getenv("CASEFLOW_API_CORS_ORIGINS", "*")
ALLOW_ALL_ORIGINS = "*"
CORS_ORIGINS = []
if CASEFLOW_API_CORS_ORIGINS != "*":
    CORS_ORIGINS = CASEFLOW_API_CORS_ORIGINS.split(",")



NEW_APPLICATION_STATUS = "New"
DRAFT_APPLICATION_STATUS = "Draft"
KEYCLOAK_DASHBOARD_BASE_GROUP = "formsflow-analytics"
ANONYMOUS_USER = "Anonymous-user"

FILTER_MAPS = {
    "application_id": {"field": "id", "operator": "eq"},
    "application_name": {"field": "form_name", "operator": "ilike"},
    "application_status": {"field": "application_status", "operator": "eq"},
    "created_by": {"field": "created_by", "operator": "eq"},
    "modified_from": {"field": "modified", "operator": "ge"},
    "modified_to": {"field": "modified", "operator": "le"},
    "created_from": {"field": "created", "operator": "ge"},
    "created_to": {"field": "created", "operator": "le"},
    "form_name": {"field": "form_name", "operator": "ilike"},
}

DEFAULT_PROCESS_KEY = "Defaultflow"
DEFAULT_PROCESS_NAME = "Default Flow"

CHROME_DRIVER_PATH = os.getenv("CHROME_DRIVER_PATH", "/usr/local/bin/chromedriver")
