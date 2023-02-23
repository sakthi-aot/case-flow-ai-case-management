import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Summary :  Create input DTO for Case events
 * Created By : Akhila U S
 */
@InputType()
export class CreateCaseEventInput {
  @Field((type) => Int)
  artifactId: number;

  @Field((type) => Int)
  eventtypeId: number;
}
