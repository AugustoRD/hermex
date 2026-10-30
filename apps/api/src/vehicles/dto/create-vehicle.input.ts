import { Field, Float, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateVehicleInput {
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

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  available?: boolean;
}
