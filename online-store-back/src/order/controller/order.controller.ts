import {
  Body,
  Controller,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { QueryDto } from '../../global-interface/dto/query.dto';
import { OrderEntity } from '../entity/order.entity';
import { OrderService } from '../service/order.service';

@ApiTags('order')
@Controller('api/orders')
export class OrderController {
  constructor(private ordersService: OrderService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() order: OrderEntity,
  ): Promise<StatusMessageDto> {
    return this.ordersService.createOrder(req.user.sub, order);
  }

  @Post('query')
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() queryOrdersDto: QueryDto,
  ): Promise<OrderEntity[]> {
    return this.ordersService.getOrders(req.user.sub, queryOrdersDto);
  }
}
