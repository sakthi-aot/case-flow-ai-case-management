import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Cases } from 'src/cases/entities/cases.entity';
import { CaseTypes } from 'src/case_types/entities/case_type.entity';
import {
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@ObjectType()
@Entity()
export class CaseStatuses {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  casetypeid: number;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field()
  displayname: string;

  @Column({ nullable: true })
  @Field()
  code: string;

  @ManyToOne(() => CaseTypes, (casetype) => casetype.casestatus)
  @Field(() => CaseTypes, { nullable: true })
  @JoinColumn({ name: 'casetypeid' })
  casestype: CaseTypes;

  @OneToMany(() => Cases, (cases) => cases.casestatus)
  @Field(() => [Cases], { nullable: true })
  cases: Cases[];
}
