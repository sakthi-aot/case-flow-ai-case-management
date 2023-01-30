import { CreateCaseTypeInput } from './create-case_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseTypeInput extends PartialType(CreateCaseTypeInput) {
  @Field(() => Int)
  id: number;
}
