import { Field, ObjectType, Int  } from '@nestjs/graphql';
import { CaseflowLob } from './caseflow_lob.entity';


/**
 * Summary :  Entity Class For External lob Response
 * Created By : Don Basil Peter
 */

@ObjectType()
export class CaseflowLobResponse {
  @Field(type => [CaseflowLob])
  CaseflowLob: CaseflowLob[]

  @Field(type => Int)
  totalCount: number
}