import { Args, Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { DocumentsService } from "../services/documents.service";
import { Cases } from "../entities/cases.entity";
import { FetchArgs } from "../dto/fetch-args.input";
import { caseDocumentResponse } from "../entities/case_document_response.entity";

/**
 *  Resolvers For Cases
 */
@Resolver((of)=>Cases)
export class CasesResolver{
constructor(private readonly documentService:DocumentsService){}

@ResolveField((of)=>caseDocumentResponse)
public async documents(@Parent() cases:Cases,@Args() args: FetchArgs):Promise<caseDocumentResponse>{
   const output = await this.documentService.forCases(args,cases.id);
   return output;
}
}