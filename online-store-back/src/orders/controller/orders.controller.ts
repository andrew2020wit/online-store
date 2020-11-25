import { Controller, Put } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Put()
  createOrder() {}
}
