import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber } from 'class-validator';

//_____________________Custom Imports_____________________//
import { CreateCaseEventInput } from './create-case_event.input';

/**
 * Summary :  Update input DTO for Case events
 * Created By : Akhila U S
 */
@InputType()
export class UpdateCaseEventInput extends PartialType(CreateCaseEventInput) {
  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
