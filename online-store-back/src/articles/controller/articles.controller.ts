import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { ArticleEntity } from '../entity/article.entity';
import { ArticlesService } from '../service/articles.service';

@ApiTags('articles')
@Controller('api/articles')
export class ArticlesController {
  constructor(private entityService: ArticlesService) {}

  @Get()
  async getById(@Query() query: { id: string }): Promise<ArticleEntity> {
    return await this.entityService.getById(query.id);
  }

  @Post('query-header')
  async getOrders(@Body() queryDto: QueryDto): Promise<ArticleEntity[]> {
    return await this.entityService.query(queryDto);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Post()
  async createOrEdit(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() entity: ArticleEntity,
  ) {
    return await this.entityService.createOrEdit(
      entity,
      req.user.sub,
      req.user.role,
    );
  }
}
