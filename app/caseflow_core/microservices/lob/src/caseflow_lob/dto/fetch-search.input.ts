import { Field, Int, ArgsType } from '@nestjs/graphql'
import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator'

@ArgsType()
export class FetchSearchArgs {
  @Field(() => String)  
  @IsString()
  @IsNotEmpty()
  searchField 

  @Field(() => String)  
  @IsString()
  @IsNotEmpty()
  searchColumn 

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