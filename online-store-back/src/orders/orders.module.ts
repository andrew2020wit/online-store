import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrderItemsEntity } from './entity/order-items.entity';
import { OrdersEntity } from './entity/orders.entity';

@Module({
  controllers: [OrdersController],
  imports: [TypeOrmModule.forFeature([OrderItemsEntity, OrdersEntity])],
  exports: [TypeOrmModule],
})
export class OrdersModule {}
