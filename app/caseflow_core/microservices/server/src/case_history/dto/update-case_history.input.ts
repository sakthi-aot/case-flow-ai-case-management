import { CreateCaseHistoryInput } from './create-case_history.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
/**
 * Summary :  update DTO for casehistory
 * Created By : Akhila U S
 */
@InputType()
export class UpdateCaseHistoryInput extends PartialType(CreateCaseHistoryInput) {
  @Field(() => Int)
  id: number;
}
