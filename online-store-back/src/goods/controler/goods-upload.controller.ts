import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { ManagerJwtAuthGuard } from 'src/auth/guards/manager-jwt-auth.guard';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../entity/goods.entity';
import { editFileName, imageFileFilter } from '../utils/file-upload.utils';

@Controller('goods-upload')
export class GoodsUploadController {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}
  @Post(':type/:id')
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
