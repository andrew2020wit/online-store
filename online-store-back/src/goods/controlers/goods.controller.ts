import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { GoodsEntity } from '../goods.entity';

@Controller('goods')
export class GoodsController {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}
  @Post('query')
  @UseGuards(JwtAuthGuard)
  async getOrders(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() queryDto: QueryDto,
  ): Promise<GoodsEntity[]> {
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
