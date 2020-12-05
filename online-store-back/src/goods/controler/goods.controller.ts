import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';
import { GoodsService } from '../service/goods.service';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@ApiTags('goods')
@Controller('api/goods')
export class GoodsController {
  constructor(
    private service: GoodsService,
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}

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

  @Post('upload/:type/:id')
  @UseGuards(ManagerJwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public/photos',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file, @Param() params) {
    if (params.type === 'bigPhotoUrl') {
      await this.goodsRepository.update(params.id, {
        bigPhotoUrl: `/photos/${file.filename}`,
      });
    } else if (params.type === 'smallPhotoUrl') {
      await this.goodsRepository.update(params.id, {
        smallPhotoUrl: `/photos/${file.filename}`,
      });
    } else {
      return {
        Ok: false,
        originalName: file.originalName,
        filename: file.filename,
      };
    }
    const response = {
      Ok: true,
      originalName: file.originalName,
      filename: file.filename,
    };
    return response;
  }
}
