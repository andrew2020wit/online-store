import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository } from 'typeorm';
import { GoodsEntity } from './goods.entity';

@Injectable()
export class TestInitGoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
  ) {}

  async goodsGenerator() {
    this.clearTables();
    for (let n = 1; n <= 200; n++) {
      await this.goodsRepository.save({
        name: `GoodsName #${n}`,
        description: `GoodsDescription # ${n}`,
        price: n * 3,
      });
    }
  }

  async clearTables(): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('goods_entity')
      .execute();
  }
}
