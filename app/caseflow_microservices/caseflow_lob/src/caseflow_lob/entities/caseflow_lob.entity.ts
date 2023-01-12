import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class CaseflowLob {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  caseId?: number;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  policyNumber?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyEffectiveDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  policyExpiryDate?: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  isActive?: boolean;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  sumAssured?: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdDate?: Date;
}
