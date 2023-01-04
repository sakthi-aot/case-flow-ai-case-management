import { Field, ObjectType, Int ,Directive,ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/cases.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
@ObjectType()

export class CaseHistory {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field((type) => Int)
  datetime: number;

  @Column()
  @Field()
  outcome: string;

  @Column({ nullable: true })
  @Field()
  userid: number;



  // @ManyToOne(()=>Cases,cases => cases.id)
  // @JoinColumn({ name: "caseid", referencedColumnName: "id"})
  // @Field(type=>[Cases],{nullable:true})
  // cases?:Cases;

  @ManyToOne(() => Cases, (cases) => cases.casehistory)
  @Field(() => Cases, { nullable: true })
  case: Cases;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseid: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseId: number;
}