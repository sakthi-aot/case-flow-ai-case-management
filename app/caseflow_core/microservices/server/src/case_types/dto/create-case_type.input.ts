import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateCaseTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  @IsNumber()
  @IsNotEmpty()
  exampleField: number;
}
