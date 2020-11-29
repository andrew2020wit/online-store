import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrderItemsEntity } from './entity/order-items.entity';
import { OrdersEntity } from './entity/orders.entity';
import { OrdersResolver } from './graphql/orders.resolver';
import { TestInitOrdersService } from './test-init-orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersResolver, TestInitOrdersService],
  imports: [TypeOrmModule.forFeature([OrderItemsEntity, OrdersEntity])],
  exports: [TypeOrmModule, TestInitOrdersService, OrdersResolver],
})
export class OrdersModule {}
