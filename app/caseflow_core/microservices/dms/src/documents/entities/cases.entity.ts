import { Directive, Field, ID, Int, ObjectType } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//
import { caseDocumentResponse } from './case_document_response.entity';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields:"id")')
export class Cases {
  @Field((type) => ID)
  @Directive('@external')
  id: number;

  @Field((type) => Int)
  @Directive('@external')
  take: number;

  @Field((type) => Int)
  @Directive('@external')
  skip: number;

  @Field((type) => caseDocumentResponse)
  documents: caseDocumentResponse;
}
