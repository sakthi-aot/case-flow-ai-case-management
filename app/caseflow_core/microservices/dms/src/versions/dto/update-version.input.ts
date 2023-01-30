

import { Field, InputType, Int } from '@nestjs/graphql';

/**
 * Summary :  update input DTO for Versions
 * Created By : Akhila U S
 */
@InputType()
export class UpdateVersionInput {

  @Field((type) => Int)
  id: number;
  
  @Field((type) => Int, { nullable: true })
  docId: number;

  @Field()
  versions: string;

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field({ defaultValue: new Date() })
  modification: Date;

  @Field()
  documentid: string;


}
