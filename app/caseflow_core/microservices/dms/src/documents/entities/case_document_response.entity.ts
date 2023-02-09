import {  Field, Int, ObjectType } from "@nestjs/graphql";
import {  CaseDocuments } from "./documents.entity";

/**
 * Summary :  Entity Class For case document response
 * Created By : Akhila U S
 */

@ObjectType()
export class caseDocumentResponse {
  @Field(type => [CaseDocuments])
  CaseDocuments: CaseDocuments[]

  @Field(type => Int)
  totalCount: number
}