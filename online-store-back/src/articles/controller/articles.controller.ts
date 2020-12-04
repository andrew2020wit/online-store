import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { RequestWithJwtUserExtDto } from 'src/auth/interfaces/request-with-user-ext.interface';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { ArticleEntity } from '../entity/article.entity';
import { ArticlesService } from '../service/articles.service';

@ApiTags('article')
@Controller('api/article')
export class ArticlesController {
  constructor(private entityService: ArticlesService) {}

  @Get('get-by-id/:id')
  async getById(@Param('id') id: string): Promise<ArticleEntity> {
    return await this.entityService.getById(id);
  }

  @Post('query-headers')
  async getOrders(@Body() queryDto: QueryDto): Promise<ArticleEntity[]> {
    return await this.entityService.query(queryDto);
  }

  @UseGuards(ManagerJwtAuthGuard)
  @Post('create-or-edit')
  async createOrEdit(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() entity: ArticleEntity,
  ): Promise<StatusMessageDto> {
    return await this.entityService.createOrEdit(
      entity,
      req.user.sub,
      req.user.role,
    );
  }
}
