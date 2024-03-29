import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Summary :  Create input DTO for Case events
 * Created By : Akhila U S
 */
@InputType()
export class CreateCaseEventInput {
  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  artifactId: number;

  @Field((type) => Int)
  @IsNumber()
  @IsNotEmpty()
  eventtypeId: number;

  @Field({ nullable: true })
  @IsString()
  workflowtype: string;
}
