import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersController } from './controller/orders.controller';
import { OrderItemsEntity } from './entity/order-items.entity';
import { OrdersEntity } from './entity/orders.entity';
import { OrdersService } from './service/orders.service';
import { TestInitOrdersService } from './service/test-init-orders.service';

@Module({
  controllers: [OrdersController],
  providers: [TestInitOrdersService, OrdersService],
  imports: [TypeOrmModule.forFeature([OrderItemsEntity, OrdersEntity])],
  exports: [TypeOrmModule, TestInitOrdersService],
})
export class OrdersModule {}
