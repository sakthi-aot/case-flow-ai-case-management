import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { DocumentsService } from "./documents.service";
import { Cases } from "./cases.entity";
import { caseDocumentResponse, CaseDocuments } from "./documents.entity";
import { FetchArgs } from "./dto/fetch-args.input";

@Resolver((of)=>Cases)
export class CasesResolver{
constructor(private readonly documentService:DocumentsService){}

@ResolveField((of)=>caseDocumentResponse)
public async documents(@Parent() cases:Cases,@Args() args: FetchArgs):Promise<caseDocumentResponse>{
   const output =await this.documentService.forCases(args,cases.id);
   return output 
}
}