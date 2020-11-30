import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsController } from './controlers/goods.controller';
import { GoodsEntity } from './goods.entity';
import { GoodsResolver } from './graphql/goods.resolver';
import { TestInitGoodsService } from './test-init-goods.service';
import { GoodsService } from './goods.service';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsEntity])],
  providers: [TestInitGoodsService, GoodsResolver, GoodsService],
  exports: [TypeOrmModule, TestInitGoodsService],
  controllers: [GoodsController],
})
export class GoodsModule {}
