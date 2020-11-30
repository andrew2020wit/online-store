import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
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
    @Query() query: { id: string; status: boolean },
  ): Promise<StatusMessageDto> {
    return this.service.activate(query.id, query.status);
  }
}