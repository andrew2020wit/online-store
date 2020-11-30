import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { GoodsEntity } from '../goods.entity';

@Controller('api/goods')
export class GoodsController {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}

  @Post('query')
  async getOrders(@Body() queryDto: QueryDto): Promise<GoodsEntity[]> {
    return this.goodsRepository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(queryDto.createdOnLessThan),
        name: Like(`%${queryDto.pattern}%`),
        isActive: true,
      },
    });
  }
}
