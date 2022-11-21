"""This manages Form ProcessMapper Database Models."""

from __future__ import annotations

from http import HTTPStatus

from flask import current_app
from flask_sqlalchemy import BaseQuery

from sqlalchemy import UniqueConstraint, and_, desc
from sqlalchemy.dialects.postgresql import JSON
from sqlalchemy.sql.expression import text

from .base_model import BaseModel
from .db import db


class CaseEvents(BaseModel, db.Model):
    """This class manages form process mapper information."""
    __tablename__ = "CaseEvents"
    id = db.Column(db.Integer, primary_key=True)
    eventtype = db.Column(db.Integer, nullable=False)
    artifactid = db.Column(db.Integer, nullable=False)
 

   

