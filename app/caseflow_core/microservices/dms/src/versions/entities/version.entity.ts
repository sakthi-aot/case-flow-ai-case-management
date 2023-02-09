

import { Field, ObjectType, Int ,ID } from '@nestjs/graphql';
import { CaseDocuments } from 'src/documents/entities/documents.entity';
import { Entity, PrimaryGeneratedColumn, Column,  ManyToOne,  JoinColumn } from 'typeorm';

/**
 * Summary :  Entity Class For versions
 * Created By : Akhila U S
 */

@Entity()
@ObjectType()
export class Versions {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number;

  @Column({ nullable: true })
  @Field((type) => Int)
  docid: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  versions: number;

  @Column({ nullable: true })
  @Field({ nullable: true })
  creationdate: Date;

  @Column({ nullable: true })
  @Field()
  modificationdate: Date;

  @Column({ nullable: true })
  @Field()
  documentid: string;


  @ManyToOne(() => CaseDocuments, (documents) => documents.versions)
  @Field(() => CaseDocuments, { nullable: true })
  @JoinColumn({name: 'docid'})
  documents: CaseDocuments;

}




