import { Field, ObjectType, Int,Directive,ID } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Cases } from './cases.entity';

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class CaseDocuments {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column()
  @Field()
  caseId: number;

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

  @Column()
  @Field({ nullable: true })
  type: string;

  @Field(() => Cases)
  cases: Cases;
}
