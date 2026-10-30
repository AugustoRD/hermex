import { Field, Float, GraphQLISODateTime, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  brand!: string;

  @Field(() => String)
  model!: string;

  @Field(() => Int)
  year!: number;

  @Field(() => String)
  licensePlate!: string;

  @Field(() => Float)
  dailyRate!: number;

  @Field(() => Boolean)
  available!: boolean;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;
}
