import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateCaseTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
