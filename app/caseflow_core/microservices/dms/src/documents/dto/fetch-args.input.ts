import { Field, Int, ArgsType } from '@nestjs/graphql';
/**
 * Summary :  Create fetch DTO for documents
 * Created By : Akhila U S
 */
@ArgsType()
export class FetchArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 25;

 
}