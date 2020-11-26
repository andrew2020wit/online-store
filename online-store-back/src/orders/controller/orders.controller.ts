import { Body, Controller, Put, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { Repository } from 'typeorm';
import { OrderDto } from '../dto/order.dto';
import { OrderItemsEntity } from '../entity/order-items.entity';
import { OrdersEntity } from './../entity/orders.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() orderDto: OrderDto,
  ): Promise<StatusMessageDto> {
    const retMes: StatusMessageDto = {
      ok: false,
      source: 'createOrder',
      message: '',
    };

    // validation
    if (orderDto.header.deliverAddress == '') {
      retMes.message = 'deliverAddress must be no empty';
      return retMes;
    }
    if (orderDto.body.length == 0) {
      retMes.message = 'order is empty';
      return retMes;
    }
    if (orderDto.body[0].count == 0) {
      retMes.message = 'count must be > 0';
      return retMes;
    }

    const newOrder = new OrdersEntity();
    newOrder.userId = req.user.sub;
    newOrder.status = 'new';
    newOrder.deliverAddress = orderDto.header.deliverAddress;
    newOrder.userNote = orderDto.header.userNote;

    // create orderItems
    orderDto.body.forEach(item => {
      if (item.count > 0) {
        const newItem = new OrderItemsEntity();
        newItem.count = item.count;
        newItem.goodsId = item.goodsId;
        newItem.price = item.price;
        newOrder.items.push(newItem);
      }
    });

    //save order
    const savedOrder = await this.ordersRepository.save(newOrder);
    retMes.ok = true;
    retMes.message = `OrderId: ${savedOrder.id}`;
    retMes.resultId = savedOrder.id;
    return retMes;
  }
}
