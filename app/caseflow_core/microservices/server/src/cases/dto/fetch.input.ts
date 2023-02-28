import { Field, Int, ArgsType } from '@nestjs/graphql'
import { IsInt, Max, Min } from 'class-validator'
/**
 * Summary :  fetch DTO for Cases
 * Created By : Gokul
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

@ArgsType()
export class FetchCaseDocumentArgs{
  @Field(() => Int)
  @IsInt()
  @Min(0)
  skip = 0

  @Field(() => Int)
  @IsInt()
  @Min(1)
  @Max(50)
  take = 25

  @Field(()=>Int)
  @IsInt()
  id
}