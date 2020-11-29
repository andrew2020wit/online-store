import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';

@Injectable()
export class TestInitOrdersService {
  constructor() {}

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('order_items_entity')
      .execute();
    // await getConnection()
    //   .createQueryBuilder()
    //   .delete()
    //   .from('orders_entity')
    //   .execute();
  }
}
