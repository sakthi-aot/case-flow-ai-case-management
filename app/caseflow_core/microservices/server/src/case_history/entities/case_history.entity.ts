import { Field, ObjectType, Int ,Directive,ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/entities/cases.entity';
import { CaseEvents } from 'src/case_events/entities/case_event.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

/**
 * Summary :  Entity Class For Casehistory
 * Created By : Akhila U S
 */
@Entity()
@ObjectType()

export class CaseHistory {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;


  @Field()
  @CreateDateColumn({ type: 'timestamp' })
  datetime: Date;
  
  @Column()
  @Field()
  outcome: string;

  @Column({ nullable: true })
  @Field()
  userid: number;



  
  @Column({ nullable: true })
  @Field()
  eventId: number;



  @ManyToOne(() => CaseEvents, (event) => event.casehistory)
  @Field(() => CaseEvents, { nullable: true })
  @JoinColumn({name: 'eventId'})
  event: CaseEvents;


  @ManyToOne(() => Cases, (cases) => cases.casehistory)
  @Field(() => Cases, { nullable: true })
  case: Cases;



  @Column({ nullable: true })
  @Field({ nullable: true })
  caseId: number;
}