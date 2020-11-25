import { Module } from '@nestjs/common';
import { OrdersController } from './controller/orders.controller';

@Module({
  controllers: [OrdersController],
})
export class OrdersModule {}
