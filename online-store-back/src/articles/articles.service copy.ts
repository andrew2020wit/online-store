import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/users/user.entity';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { getConnection, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRep: Repository<UserEntity>,
  ) {}

  async getById(id: string): Promise<ArticleEntity> {
    return await this.repository.findOne(id);
  }

  async query(queryDto: QueryDto): Promise<ArticleEntity[]> {
    return this.repository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(queryDto.createdOnLessThan),
        name: Like(`%${queryDto.pattern}%`),
        isActive: true,
      },
    });
  }

  async createArticle(
    newArtDto: ArticleEntity,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    if (!userIdFromToken) {
      return {
        message: 'userIdFromToken in null',
        source: 'createArticle',
        ok: false,
      };
    }

    const connection = getConnection();
    const newArt = new ArticleEntity();
    newArt.title = newArtDto.title;
    newArt.description = newArtDto.description;
    newArt.text = newArtDto.text;
    newArt.author = await connection.manager.findOne(
      UserEntity,
      userIdFromToken,
    );

    try {
      await connection.manager.save(newArt);

      console.log('createArticle newArtRet', newArt);

      return {
        message: newArtDto.title,
        source: 'createArticle',
        ok: true,
      };
    } catch (err) {
      return { message: err.message, source: 'createArticle', ok: false };
    }
  }

  async editArticle(
    artDto: ArticleEntity,
    userIdFromToken: string,
  ): Promise<StatusMessageDto> {
    const oldArticle = await this.repository.findOne(artDto.id);

    //if article not exist
    if (!oldArticle) {
      return {
        message: 'article id not exist',
        source: 'editArticle',
        ok: false,
      };
    }

    // if wrong user
    if (oldArticle.author.id !== userIdFromToken) {
      return {
        message: 'wrong user',
        source: 'editArticle',
        ok: false,
      };
    }

    // rewrite article
    oldArticle.text = artDto.text;
    oldArticle.title = artDto.title;
    oldArticle.description = artDto.description;
    try {
      await this.repository.save(oldArticle);
      return {
        message: oldArticle.title,
        source: 'editArticle',
        ok: true,
      };
    } catch (err) {
      return { message: err.message, source: 'editArticle', ok: false };
    }
  }

  async disActiveArticle(
    ArticleId: string,
    userIdFromToken: string,
    roleOfUserFromToken: string,
  ): Promise<StatusMessageDto> {
    const oldArticle = await this.repository.findOne(ArticleId);

    //if article not exist
    if (!oldArticle) {
      return {
        message: 'article id not exist',
        source: 'disActiveArticle',
        ok: false,
      };
    }

    // if wrong user
    if (
      oldArticle.author.id !== userIdFromToken &&
      roleOfUserFromToken !== 'admin'
    ) {
      return {
        message: 'wrong user',
        source: 'disActiveArticle',
        ok: false,
      };
    }

    // rewrite article
    oldArticle.isActive = false;
    try {
      await this.repository.save(oldArticle);
      return {
        message: oldArticle.title,
        source: 'disActiveArticle',
        ok: true,
      };
    } catch (err) {
      return {
        message: err.message,
        source: 'disActiveArticle',
        ok: false,
      };
    }
  }
}
