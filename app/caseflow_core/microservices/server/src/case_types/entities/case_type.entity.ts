import { ObjectType, Field, Int,ID } from '@nestjs/graphql';
import { CaseStatuses } from 'src/case_status/entities/case_status.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class CaseTypes {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  name: string;

  @Column({ nullable: true })
  @Field()
  displayname: string;


  @Column({ nullable: true })
  @Field()
  caseextrafields: number;


  @Column({ nullable: true })
  @Field()
  lobfields: number;

  @Column({ nullable: true })
  @Field()
  displaylocations: number;

  @OneToMany(() => CaseStatuses, (casestatuses) => casestatuses.casestype)
  @Field(() => [CaseStatuses], { nullable: true })
  casestatus: CaseStatuses[]

}
