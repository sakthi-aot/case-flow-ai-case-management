import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class CaseDocuments {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  caseid: number;

  @Column()
  @Field()
  documentref: string;

  @Column()
  @Field({ nullable: true })
  desc: string;

  @Column()
  @Field()
  addedbyuserid: number;

  @Column()
  @Field()
  creationdate: Date;

  @Column()
  @Field()
  dmsprovider: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  latestversion: string;

  @Column()
  @Field()
  isdeleted: boolean;
}
