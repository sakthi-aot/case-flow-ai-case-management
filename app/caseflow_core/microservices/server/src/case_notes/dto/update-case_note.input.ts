import { CreateCaseNoteInput } from './create-case_note.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCaseNoteInput extends PartialType(CreateCaseNoteInput) {
  @Field(() => Int)
  id: number;
}
