import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { GoodsEntity } from '../entity/goods.entity';
import { GoodsService } from '../service/goods.service';

@ApiTags('goods')
@Controller('api/goods')
export class GoodsController {
  constructor(private service: GoodsService) {}

  @Get('get-by-id')
  async getById(@Param('id') id: string): Promise<GoodsEntity> {
    return await this.service.getById(id);
  }

  @Post('query')
  async query(@Body() queryDto: QueryEntityDto): Promise<GoodsEntity[]> {
    return this.service.query(queryDto);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Post('create-or-update')
  async update(@Body() entity: GoodsEntity): Promise<StatusMessageDto> {
    return this.service.createOrEdit(entity);
  }
}
