import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { GoodsEntity } from '../goods.entity';
import { GoodsService } from '../goods.service';

@Controller('api/goods')
export class GoodsController {
  constructor(private service: GoodsService) {}

  @Get()
  async getById(@Query() query: { id: string }): Promise<GoodsEntity> {
    return await this.service.getById(query.id);
  }

  @Post('query')
  async query(@Body() queryDto: QueryDto): Promise<GoodsEntity[]> {
    return this.service.query(queryDto);
  }

  @Put()
  async createEntity() {}
}
