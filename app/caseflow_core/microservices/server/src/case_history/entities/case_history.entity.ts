import { Field, ObjectType, ID } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

//_____________________Custom Imports_____________________//

import { Cases } from '../../cases/entities/cases.entity';
import { CaseEvents } from '../../case_events/entities/case_event.entity';

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
  @JoinColumn({ name: 'eventId' })
  event: CaseEvents;

  @ManyToOne(() => Cases, (cases) => cases.casehistory)
  @Field(() => Cases, { nullable: true })
  case: Cases;

  @Column({ nullable: true })
  @Field({ nullable: true })
  caseId: number;
}
