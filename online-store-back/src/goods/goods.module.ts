import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './graphql/goods.resolver';
import { GoodsUploadController } from './photo-upload/goods-upload.controller';
import { TestInitGoodsService } from './test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsResolver, GoodsUploadController],
  exports: [TypeOrmModule, TestInitGoodsService],
  controllers: [GoodsUploadController],
})
export class GoodsModule {}
