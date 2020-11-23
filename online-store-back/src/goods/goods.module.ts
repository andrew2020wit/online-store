import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './graphql/goods.resolver';
import { GoodsController } from './photo-upload/goods-upload.controller';
import { TestInitGoodsService } from './test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsResolver, GoodsController],
  exports: [TypeOrmModule, TestInitGoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
