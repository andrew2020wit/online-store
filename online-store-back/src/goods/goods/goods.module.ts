import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './graphql/goods.resolver';
import { TestInitGoodsService } from './test-init-goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsResolver],
  exports: [TypeOrmModule, TestInitGoodsService],
})
export class GoodsModule {}
