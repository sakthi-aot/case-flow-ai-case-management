
import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Summary :  Create input DTO for Versions
 * Created By : Akhila U S
 */
@InputType()
export class CreateVersionInput {
  @Field((type) => Int, { nullable: true })
  docid: number;

  @Field()
  versions: number;

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field({ defaultValue: new Date() })
  modificationdate: Date;

  @Field()
  documentid: string;


}
