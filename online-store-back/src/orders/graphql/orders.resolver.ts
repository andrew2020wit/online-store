import { Args, ArgsType, Field, Int, Query, Resolver } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, Repository } from 'typeorm';
import { OrdersEntity } from '../entity/orders.entity';

@ArgsType()
export class GetOrdersArgs {
  @Field(() => Int, { defaultValue: 3 })
  take: number;

  @Field({ defaultValue: new Date() })
  createOnCursor: Date;
}

@Resolver(() => [OrdersEntity])
export class OrdersResolver {
  constructor(
    @InjectRepository(OrdersEntity)
    private ordersRepository: Repository<OrdersEntity>,
  ) {}

  @Query(() => [OrdersEntity])
  async getOrders(@Args() args: GetOrdersArgs): Promise<OrdersEntity[]> {
    return await this.ordersRepository.find({
      take: args.take,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(args.createOnCursor),
      },
    });
  }

  @Query(() => OrdersEntity)
  async getOrder(
    @Args('id', { type: () => String }) id: string,
  ): Promise<OrdersEntity> {
    return await this.ordersRepository.findOne(id);
  }
}
