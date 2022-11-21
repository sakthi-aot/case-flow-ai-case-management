from caseflow.models import CaseDocuments
from caseflow.models import CaseEvents 
from caseflow.models import BaseModel 
from caseflow.models.db import db

import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType




class Events(SQLAlchemyObjectType):
    class Meta:
        model = CaseEvents
        interfaces = (relay.Node,)


class AddEvents(graphene.Mutation,BaseModel):
    class Arguments:
        id = graphene.Int(required=False)
        caseid = graphene.Int(required=False)
        documentref = graphene.String(required=False) 
        desc = graphene.String(required=False) 
        addedbyuserid = graphene.String(required=False)
    documents = graphene.Field(lambda: Events)
      
    def mutate(self,info,id,caseid, documentref,desc,addedbyuserid):
        
        documents=CaseDocuments(id=id,caseid=caseid,documentref=documentref,desc=desc,addedbyuserid=addedbyuserid)
        db.session.add(documents)
        db.session.commit()
        return AddEvents()


class UpdateEvents(graphene.Mutation,BaseModel):
    """Update batch owner."""
    class Arguments:
        id = graphene.String()
        name = graphene.String()

    # Class attributes
    ok = graphene.Boolean()
    update_documents = graphene.Field(lambda: Events)

    def mutate(self, info, id, name):

        update_documents = Events(id=id, name=name)
        ok = True
        return UpdateEvents(update_documents=update_documents, ok=ok)        



