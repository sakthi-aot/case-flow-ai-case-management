import { Field, ObjectType ,Directive,ID } from '@nestjs/graphql';
import { CaseEvents } from 'src/case_events/entities/case_event.entity';
import { Entity, PrimaryGeneratedColumn, Column,  OneToMany } from 'typeorm';

/**
 * Summary :  Entity Class For eventtype
 * Created By : Akhila U S
 */
@Entity()
@ObjectType()
@Directive('@key(fields:"id")')
export class EventTypes {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  text: string;

  @Column({ nullable: true })
  @Field()
  code: number;



  @OneToMany(() => CaseEvents, (caseevent) => caseevent.eventtype)
  @Field(() => [CaseEvents], { nullable: true })
  caseevent: CaseEvents[]
}
