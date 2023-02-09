import { Field, ObjectType, Int  } from '@nestjs/graphql';
import { Cases } from './cases.entity';


/**
 * Summary :  Entity Class For External Cases Response
 * Created By : Akhila U S
 */

@ObjectType()
export class casesResponse {
  @Field(type => [Cases])
  Cases: Cases[]

  @Field(type => Int)
  totalCount: number
}