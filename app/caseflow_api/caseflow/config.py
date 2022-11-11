"""All of the configuration for the api is captured here.

All items are loaded, or have Constants defined here that
are loaded into the Flask configuration.
All modules and lookups get their configuration from the
Flask config, rather than reading environment variables directly
or by accessing this configuration directly.
"""

import os

from dotenv import find_dotenv, load_dotenv

# this will load all the envars from a .env file located in the project root (api)
load_dotenv(find_dotenv())

CONFIGURATION = {
    "development": "caseflow.config.DevConfig",
    "testing": "caseflow.config.TestConfig",
    "production": "caseflow.config.ProdConfig",
    "default": "caseflow.config.ProdConfig",
}


def get_named_config(config_name: str = "production"):
    """Return the configuration object based on the name.

    :raise: KeyError: if an unknown configuration is requested
    """
    if config_name in ["production", "staging", "default"]:
        config = ProdConfig()
    elif config_name == "testing":
        config = TestConfig()
    elif config_name == "development":
        config = DevConfig()
    else:
        raise KeyError(f"Unknown configuration '{config_name}'")
    return config


class _Config:  # pylint: disable=too-few-public-methods
    """Base class configuration.

    that should set reasonable defaults for all the other configurations.
    """
    # CMS repo info for CMIS connector
    CMS_REPO_URL = os.getenv("CMS_REPO_URL", default=None)
    CMS_REPO_USERNAME = os.getenv("CMS_REPO_USERNAME", default="admin")

     # Stepzen
    STEPZEN_ENDPOINT_URL = os.getenv("STEPZEN_ENDPOINT_URL", default=None)
    STEPZEN_API_KEY = os.getenv("STEPZEN_API_KEY", default=None)

    CMS_REPO_PASSWORD = os.getenv("CMS_REPO_PAxacktjgjuSSWORD", default="admin")
    PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))

    # JWT_OIDC Settings
    JWT_OIDC_WELL_KNOWN_CONFIG = os.getenv("JWT_OIDC_WELL_KNOWN_CONFIG")
    JWT_OIDC_ALGORITHMS = os.getenv("JWT_OIDC_ALGORITHMS", "RS256")
    JWT_OIDC_JWKS_URI = os.getenv("JWT_OIDC_JWKS_URI")
    JWT_OIDC_ISSUER = os.getenv("JWT_OIDC_ISSUER")
    JWT_OIDC_AUDIENCE = os.getenv("JWT_OIDC_AUDIENCE")
    JWT_OIDC_CACHING_ENABLED = os.getenv("JWT_OIDC_CACHING_ENABLED")
    JWT_OIDC_JWKS_CACHE_TIMEOUT = 300
    


class DevConfig(_Config):  # pylint: disable=too-few-public-methods
    """Development environment configuration."""

    TESTING = False
    DEBUG = True


class TestConfig(_Config):  # pylint: disable=too-few-public-methods
    """In support of testing only used by the py.test suite."""

    DEBUG = True
    TESTING = True

class ProdConfig(_Config):  # pylint: disable=too-few-public-methods
    """Production environment configuration."""
    TESTING = False
    DEBUG = False
