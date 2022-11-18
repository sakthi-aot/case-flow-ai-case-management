from caseflow.models import Case as CasesModel
from caseflow.models import BaseModel 
from caseflow.models.db import db



import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType



class Case(SQLAlchemyObjectType):
    class Meta:
        model = CasesModel
        interfaces = (relay.Node,)

    """Add Documents."""
class AddCase(graphene.Mutation,BaseModel):
    class Arguments:

        lobid = graphene.Int(required=False)
        name = graphene.String(required=False) 
        desc = graphene.String(required=False) 
        statusid = graphene.String(required=False)
        typeid = graphene.Int(required=False)
        linkedcases = graphene.String(required=False) 
        creationdate = graphene.String(required=False) 
        completiondate = graphene.String(required=False)
        lastmodificationdate = graphene.Int(required=False)
        penduntildate = graphene.String(required=False) 
        archivedate = graphene.String(required=False) 
        startuserid = graphene.String(required=False)
        currentownerid = graphene.Int(required=False)
        involvedparties = graphene.String(required=False) 

    case = graphene.Field(lambda: Case)
      
    def mutate(self,info,lobid, name,desc,statusid,typeid,linkedcases,creationdate,
    completiondate,lastmodificationdate,penduntildate,archivedate,startuserid,currentownerid,involvedparties):
        
        case=Case(lobid=lobid,name=name,desc=desc,statusid=statusid,
        typeid=typeid,linkedcases=linkedcases,creationdate=creationdate,completiondate=completiondate,
        lastmodificationdate=lastmodificationdate,penduntildate=penduntildate,archivedate=archivedate,startuserid=startuserid,
        currentownerid=currentownerid,involvedparties=involvedparties)

        db.session.add(case)
        db.session.commit()
        return AddCase(case=case)

    """Update Documents."""
class UpdateCase(graphene.Mutation,BaseModel):

    
    """Arguments to update a documents."""
    id = graphene.ID(required=True, description="Global Id of the person.")
    
    class Arguments:
        id = graphene.String()
        lobid = graphene.Int(required=False)
        name = graphene.String(required=False) 
        desc = graphene.String(required=False) 
        statusid = graphene.String(required=False)
        typeid = graphene.Int(required=False)
        linkedcases = graphene.String(required=False) 
        creationdate = graphene.String(required=False) 
        completiondate = graphene.String(required=False)
        lastmodificationdate = graphene.Int(required=False)
        penduntildate = graphene.String(required=False) 
        archivedate = graphene.String(required=False) 
        startuserid = graphene.String(required=False)
        currentownerid = graphene.Int(required=False)
        involvedparties = graphene.String(required=False) 

    # Class attributes
    ok = graphene.Boolean()
    update_case = graphene.Field(lambda: Case)

    def mutate(self, info, id, lobid, name,desc,statusid,typeid,linkedcases,creationdate,
    completiondate,lastmodificationdate,penduntildate,archivedate,startuserid,currentownerid,involvedparties):
        update_case = db.session.query(Case).filter_by(id=id).first()
        # update_documents = Documents(caseid=caseid,documentref=documentref,desc=desc,addedbyuserid=addedbyuserid)
        update_case.lobid=lobid
        update_case.name=name
        update_case.desc=desc
        update_case.statusid=statusid

        update_case.typeid=typeid
        update_case.linkedcases=linkedcases
        update_case.creationdate=creationdate
        update_case.completiondate=completiondate

        update_case.lastmodificationdate=lastmodificationdate
        update_case.penduntildate=penduntildate
        update_case.archivedate=archivedate
        update_case.startuserid=startuserid
        update_case.currentownerid=currentownerid
        update_case.involvedparties=involvedparties


        db.session.commit()
        ok = True
        return UpdateCase(update_case=update_case, ok=ok)        


    """delete Documents."""
class DeleteCase(graphene.Mutation,BaseModel):
    class Arguments:
        id = graphene.Int()
    ok = graphene.Boolean()
    delete_case = graphene.Field(Case)

    def mutate(self, info, id):
        delete_case = db.session.query(Case).filter_by(id=id).first()
        db.session.delete(delete_case)
        ok = True
        db.session.commit()
        return DeleteCase(ok=ok, delete_document=delete_case)


