import { CreateEventTypeInput } from './create-event_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

/**
 * Summary :  Create update DTO for eventtype
 * Created By : Akhila U S
 */
@InputType()
export class UpdateEventTypeInput extends PartialType(CreateEventTypeInput) {
  @Field(() => Int)
  id: number;
}
