import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Summary :  Create input DTO for casehistory
 * Created By : Akhila U S
 */

@InputType()
export class CreateCaseHistoryInput {
  @Field({ defaultValue: new Date() })
  datetime: Date;

  @Field({ defaultValue: "sucess" })
  outcome: string;

  @Field({ nullable: true })
  userid: number ;

  @Field((type) => [Int])
  caseId: number;
  
  @Field((type) => [Int])
  eventId: number;

  @Field({ nullable: true })
  doc_desc: string ;

  @Field({ nullable: true })
  doc_name: string ;

}
