import { Field, ObjectType, Int ,Directive,ID } from '@nestjs/graphql';
import { CaseHistory } from 'src/case_history/entities/case_history.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class CaseEvents {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  eventtype: number;

  @Column({ nullable: true })
  @Field()
  artifactid: number;

  @OneToMany(()=>CaseHistory,casehistory =>casehistory.eventid)
  @Field(type=>[CaseHistory],{nullable:true})
  casehistory?:CaseHistory[];
}
