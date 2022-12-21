import { Directive, Field, ID, ObjectType } from "@nestjs/graphql";
import { CaseDocuments } from "./documents.entity";

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Cases{

    @Field((type)=>ID) 
    @Directive('@external')   
    id:number

     @Field((type)=>[CaseDocuments])
    documents:CaseDocuments[]
}