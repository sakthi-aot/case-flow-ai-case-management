import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { caseDocumentResponse, CaseDocuments } from "./documents.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Cases{

    @Field((type)=>ID) 
    @Directive('@external')   
    id:number

    @Field((type)=>Int) 
    @Directive('@external')   
    take:number

    @Field((type)=>Int) 
    @Directive('@external')   
    skip:number  

     @Field((type)=>caseDocumentResponse)
    documents:caseDocumentResponse
}

