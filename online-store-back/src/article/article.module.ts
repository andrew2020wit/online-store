import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../auth/users/users.module';
import { ArticleController } from './controller/article.controller';
import { ArticleEntity } from './entity/article.entity';
import { ArticleService } from './service/article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule],
  providers: [ArticleService],
  exports: [ArticleService, TypeOrmModule],
  controllers: [ArticleController],
})
export class ArticleModule {}
