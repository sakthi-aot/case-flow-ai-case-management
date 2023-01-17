import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Summary :  Create input DTO for Case events
 * Created By : Akhila U S
 */
@InputType()
export class CreateCaseEventInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
