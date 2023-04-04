import { Field, ObjectType, Int } from '@nestjs/graphql';
import { CaseflowLob } from './caseflow_lob.entity';

@ObjectType()
export class CaseflowLobResponse {
  @Field((type) => [CaseflowLob])
  CaseflowLob: CaseflowLob[];

  @Field((type) => Int)
  totalCount: number;
}
