import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './../auth/users/users.module';
import { ArticlesController } from './controller/articles.controller';
import { ArticleEntity } from './entity/article.entity';
import { ArticlesService } from './service/articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), UsersModule],
  providers: [ArticlesService],
  exports: [ArticlesService, TypeOrmModule],
  controllers: [ArticlesController],
})
export class ArticlesModule {}
