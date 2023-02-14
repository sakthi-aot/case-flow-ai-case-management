import { Args, Int, Mutation, Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//
import { CaseDocuments } from '../entities/documents.entity';
import { DocumentsService } from '../services/documents.service';
import { CreateDocumentInput } from '../dto/create-document.input';
import { UpdateDocumentInput } from '../dto/update-documet.input';
import { HttpException } from '@nestjs/common/exceptions';

/**
 *  Resolvers For documents
 */

@Resolver((of) => CaseDocuments)
export class DocumentsResolver {
  constructor(private readonly  documentService: DocumentsService) {}

  //_____________________Query_____________________//

    /**
   * Summary :   Query For Fetching documents
   * Created By : Akhila U S
   * @returns 
   */
  @Query(() => [CaseDocuments],{ name: 'documents' })
  documents(): Promise<CaseDocuments[]> {
    return this.documentService.findAll();
  }

  /**
 * Summary :   Query For Fetching documents  by passing id
 * Created By : Akhila U S
 * @param args 
 * @returns 
 */
  @Query((returns) => [CaseDocuments])
  getCaseDocument(@Args('id', { type: () => Int }) id: number): Promise<CaseDocuments> {
    return this.documentService.findOne( id );
  }

  /**
   * method for search documents
   * @param searchField 
   * @param searchColumn 
   * @returns 
   */
  @Query((returns) => [CaseDocuments] )
  SearchCaseDocument(
    @Args('searchField') searchField: string,
    @Args('searchColumn') searchColumn : string,
     ): Promise<CaseDocuments[]> | HttpException{

    return this.documentService.searchCaseDocument(searchField,searchColumn);
  }

  //_____________________Mutation_____________________//

  /**
   * Summary : Mutation for insert documents
   * Created By : Akhila U S 
   * @param createDocumentInput 
   * @returns 
   */
  @Mutation((returns) => CaseDocuments)
  createDocument(
    @Args('createDocumentInput') createDocumentInput: CreateDocumentInput,
  ): Promise<CaseDocuments> {
    return this.documentService.createDocument(createDocumentInput);
  }
/**
 * Summary : Mutation for update documents
 * Created By : Akhila U S 
 * @param updateDocumentInput 
 * @returns 
 */
  @Mutation(() => CaseDocuments)
  updateDocument(@Args('updateDocumentInput') updateDocumentInput: UpdateDocumentInput) {
    return this.documentService.update(updateDocumentInput.id, updateDocumentInput);
  }
/**
 * Summary : Mutation for remove documents
 * Created By : Akhila U S 
 * @param id 
 * @returns 
 */
  @Mutation(() => CaseDocuments)
  removeDocument(@Args('id') id: number) {
    return this.documentService.remove(id);
  }


  //_____________________Resolver Reference For GraphQL Federation_____________________//

  @ResolveField((of)=>CaseDocuments)
  cases(@Parent() document:CaseDocuments){
    return {__typename:"Cases",id:document.caseId}
  }

}
