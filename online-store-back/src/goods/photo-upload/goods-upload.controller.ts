import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import { InjectRepository } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { Repository } from 'typeorm';
import { GoodsEntity } from '../goods.entity';
import { editFileName, imageFileFilter } from './file-upload.utils';

@Controller('goods')
export class GoodsController {
  constructor(
    @InjectRepository(GoodsEntity)
    private goodsRepository: Repository<GoodsEntity>,
  ) {}
  @Post('photo-upload/:type/:id')
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
