import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Summary :  Create input DTO for casehistory
 * Created By : Akhila U S
 */

@InputType()
export class CreateCaseHistoryInput {
  @Field({ defaultValue: new Date() })
  @IsDate()
  @IsNotEmpty()
  datetime: Date;

  @Field({ defaultValue: 'sucess' })
  @IsString()
  @IsNotEmpty()
  outcome: string;

  @Field({ nullable: true })
  @IsNumber()
  @IsNotEmpty()
  userid: number;

  @Field((type) => [Int])
  @IsNumber()
  @IsNotEmpty()
  caseId: number;

  @Field((type) => [Int])
  @IsNumber()
  @IsNotEmpty()
  eventId: number;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  doc_desc: string;

  @Field({ nullable: true })
  @IsString()
  @IsNotEmpty()
  doc_name: string;
}
