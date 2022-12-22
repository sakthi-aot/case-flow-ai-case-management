import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { DocumentsService } from "./documents.service";
import { Cases } from "./cases.entity";
import { CaseDocuments } from "./documents.entity";

@Resolver((of)=>Cases)
export class CasesResolver{
constructor(private readonly documentService:DocumentsService){}

@ResolveField((of)=>[CaseDocuments])
documents(@Parent() cases:Cases):Promise<CaseDocuments[]>{
   return  this.documentService.forCases(cases.id);
}
}