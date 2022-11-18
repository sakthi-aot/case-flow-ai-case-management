from caseflow.models import CaseDocuments
from caseflow.models import CaseEvents 
from caseflow.models import BaseModel 
from caseflow.models.db import db



import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType



class Documents(SQLAlchemyObjectType):
    class Meta:
        model = CaseDocuments
        interfaces = (relay.Node,)

    """Add Documents."""
class AddDocuments(graphene.Mutation,BaseModel):
    class Arguments:

        caseid = graphene.Int(required=False)
        documentref = graphene.String(required=False) 
        desc = graphene.String(required=False) 
        addedbyuserid = graphene.String(required=False)
    documents = graphene.Field(lambda: Documents)
      
    def mutate(self,info,caseid, documentref,desc,addedbyuserid):
        
        documents=CaseDocuments(caseid=caseid,documentref=documentref,desc=desc,addedbyuserid=addedbyuserid)
        db.session.add(documents)
        db.session.commit()
        return AddDocuments(documents=documents)

    """Update Documents."""
class UpdateDocuments(graphene.Mutation,BaseModel):

    
    """Arguments to update a documents."""
    id = graphene.ID(required=True, description="Global Id of the person.")
    
    class Arguments:
        id = graphene.String()
        caseid = graphene.Int(required=False)
        documentref = graphene.String(required=False) 
        desc = graphene.String(required=False) 
        addedbyuserid = graphene.String(required=False)

    # Class attributes
    ok = graphene.Boolean()
    update_documents = graphene.Field(lambda: Documents)

    def mutate(self, info, id, caseid, documentref,desc,addedbyuserid):
        update_documents = db.session.query(CaseDocuments).filter_by(id=id).first()
        # update_documents = Documents(caseid=caseid,documentref=documentref,desc=desc,addedbyuserid=addedbyuserid)
        update_documents.caseid=caseid
        update_documents.documentref=documentref
        update_documents.desc=desc
        update_documents.addedbyuserid=addedbyuserid
        db.session.commit()
        ok = True
        return UpdateDocuments(update_documents=update_documents, ok=ok)        


    """delete Documents."""
class DeleteDocuments(graphene.Mutation,BaseModel):
    class Arguments:
        id = graphene.Int()
    ok = graphene.Boolean()
    delete_document = graphene.Field(Documents)

    def mutate(self, info, id):
        delete_document = db.session.query(CaseDocuments).filter_by(id=id).first()
        db.session.delete(delete_document)
        ok = True
        db.session.commit()
        return DeleteDocuments(ok=ok, delete_document=delete_document)


