import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { TestInitGoodsService } from './test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService],
  exports: [TypeOrmModule, TestInitGoodsService],
})
export class GoodsModule {}
