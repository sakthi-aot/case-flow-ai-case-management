import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateCaseflowLobInput {
  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  policyNumber?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  policyEffectiveDate?: Date;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  policyExpiryDate?: Date;

  @Field({ nullable: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  @IsNotEmpty()
  sumAssured?: number;

  @Field({ nullable: true })
  @IsDate()
  @IsNotEmpty()
  createdDate?: Date;
}
