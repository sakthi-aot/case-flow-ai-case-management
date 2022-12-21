import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateDocumentInput {
  @Field((type) => Int)
  id: number;

  @Field((type) => Int, { nullable: true })
  caseid: number;

  @Field()
  documentref: string;

  @Field({ nullable: true })
  desc: string;

  @Field()
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
}
