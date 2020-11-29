import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrdersEntity } from './entity/orders.entity';

@Injectable()
export class TestInitOrdersService {
  constructor(
    @InjectRepository(OrdersEntity)
    private readonly ordersRepository: Repository<OrdersEntity>,
  ) {}

  async clearTables(): Promise<void> {
    await this.ordersRepository.delete({});
  }
}
