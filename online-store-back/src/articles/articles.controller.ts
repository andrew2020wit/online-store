import { Body, Controller, Get, Post, Put, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Controller('api/articles')
export class ArticlesController {
  constructor(
    @InjectRepository(ArticleEntity)
    private repository: Repository<ArticleEntity>,
  ) {}

  @Get()
  async getById(@Query() query: { id: string }): Promise<ArticleEntity> {
    return await this.repository.findOne(query.id);
  }

  @Post('query')
  async getOrders(@Body() queryDto: QueryDto): Promise<ArticleEntity[]> {
    return this.repository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(queryDto.createdOnLessThan),
        title: Like(`%${queryDto.pattern}%`),
        isActive: true,
      },
    });
  }

  @Put()
  async createEntity() {}
}
