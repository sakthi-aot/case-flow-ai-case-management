"""Manage the database and some other items required to run the API."""

import logging



# models included so that migrate can build the database migrations

from caseflow import create_app

from flask.cli import FlaskGroup

APP = create_app()
cli = FlaskGroup(APP)


if __name__ == '__main__':
    logging.log(logging.INFO, 'Running the Manager')
    cli()
