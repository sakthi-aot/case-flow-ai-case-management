import { InputType, Int, Field } from '@nestjs/graphql';

/**
 * Summary :  Update input DTO for Caseflow Lob
 * Created By : Don Basil Peter
 */
@InputType()
export class UpdateCaseflowLobInput {
  @Field((type) => Int)
  id: number;

  @Field(() => Int, { nullable: true })
  caseId?: number;

  @Field(() => Int, { nullable: true })
  policyNumber?: number;

  @Field({ nullable: true })
  policyEffectiveDate?: Date;

  @Field({ nullable: true })
  policyExpiryDate?: Date;

  @Field({ nullable: true })
  isActive?: boolean;

  @Field(() => Int, { nullable: true })
  sumAssured?: number;

  @Field({ nullable: true })
  createdDate?: Date;
}
