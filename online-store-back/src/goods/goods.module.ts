import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './controlers/goods.controller';
import { GoodsEntity } from './goods.entity';
import { GoodsService } from './goods.service';
import { TestInitGoodsService } from './test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsService],
  exports: [TypeOrmModule, TestInitGoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
