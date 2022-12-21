import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
@ObjectType()
export class Cases {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true })
  @Field((type) => Int)
  lobid: number;

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  desc: string;

  @Column({ nullable: true })
  @Field()
  statusid: number;

  @Column({ nullable: true })
  @Field()
  typeid: number;

  @Column('int', { array: true, nullable: true })
  @Field((type) => [Int], { nullable: true })
  linkedcases: number[];

  @Column({ nullable: true })
  @Field()
  creationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  completiondate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  lastmodificationdate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  penduntildate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  archivedate: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  startuserid: number;

  @Column({ nullable: true })
  @Field()
  currentownerid: number;

  @Column('int', { array: true, nullable: true })
  @Field((type) => [Int], { nullable: true })
  involvedparties: number[];

  @Column({ nullable: true })
  @Field()
  isdeleted: boolean;
}