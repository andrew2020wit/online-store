import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { QueryEntityDto } from 'src/global-interface/dto/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
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
  @Put()
  async create(@Body() entity: GoodsEntity): Promise<StatusMessageDto> {
    return this.service.create(entity);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Post()
  async update(@Body() entity: GoodsEntity): Promise<StatusMessageDto> {
    return this.service.update(entity);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Delete()
  async activate(
    @Body() query: { id: string; status: boolean },
  ): Promise<StatusMessageDto> {
    return this.service.activate(query.id, query.status);
  }
}
