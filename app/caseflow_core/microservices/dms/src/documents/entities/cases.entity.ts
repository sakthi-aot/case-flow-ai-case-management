import { Directive, Field, ID, Int, ObjectType } from "@nestjs/graphql";
import { caseDocumentResponse } from "./case_document_response.entity";


/**
 * Summary :  Entity Class For cases
 * Created By : Akhila U S
 */

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

