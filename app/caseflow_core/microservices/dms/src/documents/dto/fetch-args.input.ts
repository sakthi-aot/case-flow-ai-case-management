import { Field, Int, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class FetchArgs {
  @Field(() => Int)
  skip = 0;

  @Field(() => Int)
  take = 25;
}
