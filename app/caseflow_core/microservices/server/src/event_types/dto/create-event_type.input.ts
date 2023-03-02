import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
/**
 * Summary :  Create input DTO for eventtype
 * Created By : Akhila U S
 */
@InputType()
export class CreateEventTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  @IsNotEmpty()
  exampleField: number;
}
