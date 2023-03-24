import { Field, Int, ArgsType } from '@nestjs/graphql'

@ArgsType()
export class FetchDocumentSearchInput {
  @Field(() => String)  
  searchField 

  @Field(() => String)  
  searchColumn 

  @Field(() => String)  
  toDate 

  @Field(() => String)  
  fromDate 

  @Field(() => Int)  
  skip = 0

  @Field(() => Int) 
  take = 25

  @Field(() => String) 
  orderBy

  @Field(() => String) 
  orderType
}
