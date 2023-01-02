import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateDocumentInput {
  @Field((type) => Int, { nullable: true })
  caseid: number;

  @Field()
  documentref: string;

  @Field({ nullable: true })
  desc: string;

  @Field({ nullable: true })
  addedbyuserid: number;

  @Field({ defaultValue: new Date() })
  creationdate: Date;

  @Field()
  dmsprovider: number;

  @Field()
  name: string;

  @Field()
  latestversion: string;

  @Field({ defaultValue: false })
  isdeleted: boolean;

  @Field({ nullable: true })
  type: string;
}
