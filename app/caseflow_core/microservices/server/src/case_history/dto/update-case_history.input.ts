import { CreateCaseHistoryInput } from './create-case_history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';
/**
 * Summary :  update DTO for casehistory
 * Created By : Akhila U S
 */
@InputType()
export class UpdateCaseHistoryInput extends PartialType(CreateCaseHistoryInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
