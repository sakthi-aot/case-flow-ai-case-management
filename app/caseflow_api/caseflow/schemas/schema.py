
from caseflow.schemas import documents_schema,events_schema,cases_schema
from caseflow.models import BaseModel 
from caseflow.models.db import db

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType




class Query(graphene.ObjectType):
    node = relay.Node.Field()
    documents = SQLAlchemyConnectionField(documents_schema.Documents.connection, sort=documents_schema.Documents.sort_argument())
    events = SQLAlchemyConnectionField(events_schema.Events.connection, sort=None)
    cases = SQLAlchemyConnectionField(cases_schema.CasesModel.connection, sort=None)

    

class Mutation(graphene.ObjectType):
    add_documents = documents_schema.AddDocuments.Field()
    update_documents = documents_schema.UpdateDocuments.Field()
    delete_documents = documents_schema.DeleteDocuments.Field()

    add_cases = cases_schema.AddCase.Field()
    update_cases = cases_schema.UpdateCase.Field()
    delete_cases = cases_schema.DeleteCase.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)


