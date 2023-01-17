import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Summary :  Create input DTO for casehistory
 * Created By : Akhila U S
 */

@InputType()
export class CreateCaseHistoryInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
