import { Field, Int, ArgsType } from '@nestjs/graphql'
import { IsInt, Max, Min } from 'class-validator'
/**
 * Summary :  fetch DTO for lob
 * Created By : Don
 */
@ArgsType()
export class FetchArgs {
  @Field(() => Int)
  @IsInt()
  @Min(0)
  skip = 0

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  take = 25
}
