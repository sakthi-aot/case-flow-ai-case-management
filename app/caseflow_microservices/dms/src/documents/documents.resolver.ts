import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//
import { CaseDocuments } from './documents.entity';
import { DocumentsService } from './documents.service';
import { CreateDocumentInput } from './dto/create-document.input';
import { UpdateDocumentInput } from './dto/update-documet.input';

@Resolver((of) => CaseDocuments)
export class DocumentsResolver {
  constructor(private documentService: DocumentsService) {}

  //_____________________Query_____________________//

  @Query((returns) => [CaseDocuments])
  documents(): Promise<CaseDocuments[]> {
    return this.documentService.findAll();
  }
  @Query((returns) => [CaseDocuments])
  getCase(@Args('id', { type: () => Int }) id: number): Promise<CaseDocuments> {
    return this.documentService.findOne( id );
  }

  //_____________________Mutation_____________________//

  @Mutation((returns) => CaseDocuments)
  createCase(
    @Args('createCaseInput') createCaseInput: CreateDocumentInput,
  ): Promise<CaseDocuments> {
    return this.documentService.createDocument(createCaseInput);
  }

  @Mutation(() => CaseDocuments)
  updateCases(@Args('cases') updateCaseInput: UpdateDocumentInput) {
    return this.documentService.update(updateCaseInput.id, updateCaseInput);
  }

  @Mutation(() => CaseDocuments)
  removeCases(@Args('id') id: number) {
    return this.documentService.remove(id);
  }
}
