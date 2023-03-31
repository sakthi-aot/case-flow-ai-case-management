import { Field, Int, ObjectType } from '@nestjs/graphql';

//_____________________Custom Imports_____________________//

import { CaseDocuments } from './documents.entity';

@ObjectType()
export class caseDocumentResponse {
  @Field((type) => [CaseDocuments])
  CaseDocuments: CaseDocuments[];

  @Field((type) => Int)
  totalCount: number;
}
