import { CreateCaseTypeInput } from './create-case_type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

@InputType()
export class UpdateCaseTypeInput extends PartialType(CreateCaseTypeInput) {
  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  displayname: string;

  @Field({ nullable: true })
  caseextrafields: number | null;

  @Field({ nullable: true })
  lobfields: number | null;

  @Field()
  @IsNumber()
  code: number;

  @Field({ nullable: true })
  displaylocations: number;

  @Field({ nullable: true })
  @IsString()
  formid: string | null;
}
