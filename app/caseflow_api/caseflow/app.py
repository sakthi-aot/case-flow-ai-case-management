"""App initialization.

Initialize app and the dependencies.
"""

import json
import os
from http import HTTPStatus
from flask import Flask, current_app, g, request
from werkzeug.middleware.proxy_fix import ProxyFix
from flask_graphql import GraphQLView
from caseflow.schemas import schema
from caseflow.resources import API
from caseflow import config,models
from caseflow.models import db, ma
from flask_migrate import Migrate

from caseflow.utils import (
    jwt,
    CASEFLOW_API_CORS_ORIGINS,
    CORS_ORIGINS,
    ALLOW_ALL_ORIGINS
)


def create_app(run_mode=os.getenv("FLASK_ENV", "development")):
    app = Flask(__name__)
    app.wsgi_app = ProxyFix(app.wsgi_app)
    app.config.from_object(config.CONFIGURATION[run_mode])
    db.init_app(app)
    ma.init_app(app)

    MIGRATE = Migrate(app, db)
    API.init_app(app)
    setup_jwt_manager(app, jwt)
    app.add_url_rule(
    "/graphql", view_func=GraphQLView.as_view("graphql", schema=schema, graphiql=True)
)

    @app.after_request
    def cors_origin(response):  # pylint: disable=unused-variable
        if CASEFLOW_API_CORS_ORIGINS == ALLOW_ALL_ORIGINS:
            response.headers["Access-Control-Allow-Origin"] = "*"
            response.headers["Access-Control-Expose-Headers"] = "*,*"
        else:
            for url in CORS_ORIGINS:
                assert request.headers["Host"]
                if request.headers.get("Origin"):
                    response.headers["Access-Control-Allow-Origin"] = request.headers[
                        "Origin"
                    ]
                elif url.find(request.headers["Host"]) != -1:
                    response.headers["Access-Control-Allow-Origin"] = url
        return response

    @app.after_request
    def add_additional_headers(response):  # pylint: disable=unused-variable
        response.headers["X-Frame-Options"] = "DENY"
        return response

    @app.after_request
    def translate_response(response):  # pylint: disable=unused-variable
        """Select the client specific language from the token locale attribute."""
        try:
            if response.status_code in [
                HTTPStatus.BAD_REQUEST,
                HTTPStatus.UNAUTHORIZED,
                HTTPStatus.FORBIDDEN,
                HTTPStatus.NOT_FOUND,
            ]:
                lang = g.token_info["locale"]
                if lang == "en":
                    return response
                json_response = response.get_json()
                str_response = json.dumps(json_response)
                response.set_data(str_response)
            return response
        except KeyError as err:
            current_app.logger.warning(err)
            return response
        except Exception as err:  # pylint: disable=broad-except
            current_app.logger.critical(err)
            return response
    register_shellcontext(app)        
    return app

def setup_jwt_manager(app, jwt_manager):
    """Use flask app to configure the JWTManager to work for a particular Realm."""

    def get_roles(a_dict):
        resource = a_dict["resource_access"].get(app.config["JWT_OIDC_AUDIENCE"])
        return resource["roles"] if resource else a_dict["roles"]

    app.config["JWT_ROLE_CALLBACK"] = get_roles
    jwt_manager.init_app(app)

def register_shellcontext(app):
    """Register shell context objects."""

    def shell_context():
        """Shell context objects."""
        return {"app": app, "jwt": jwt, "db": db, "models": models}  # pragma: no cover

    app.shell_context_processor(shell_context)













