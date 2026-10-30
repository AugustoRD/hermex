import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';

@ObjectType()
export class HealthStatus {
  @Field(() => String)
  status!: string;

  @Field(() => String)
  service!: string;

  @Field(() => String)
  message!: string;
}

@Resolver()
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => HealthStatus, {
    name: 'health',
    description: 'Verifica o status de saúde da API GraphQL da Hermex',
  })
  getHealth(): HealthStatus {
    return {
      status: 'ok',
      service: 'hermex-api',
      message: this.appService.getHello(),
    };
  }
}
