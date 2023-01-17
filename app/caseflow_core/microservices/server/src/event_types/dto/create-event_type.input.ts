import { InputType, Int, Field } from '@nestjs/graphql';
/**
 * Summary :  Create input DTO for eventtype
 * Created By : Akhila U S
 */
@InputType()
export class CreateEventTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
