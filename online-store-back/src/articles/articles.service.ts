import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/users/user.entity';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getById(id: string): Promise<ArticleEntity> {
    return await this.repository.findOne(id);
  }

  async query(queryDto: QueryDto): Promise<ArticleEntity[]> {
    return this.repository.find({
      select: ['id', 'title', 'description', 'createdOn', 'updatedOn'],
      relations: ['author'],
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: {
        createdOn: LessThan(queryDto.createdOnLessThan),
        title: Like(`%${queryDto.pattern}%`),
        isActive: true,
      },
    });
  }

  async createOrEdit(
    entity: ArticleEntity,
    userIdFromToken: string,
    userRoleFromToken: string,
  ): Promise<StatusMessageDto> {
    const result = new StatusMessageDto('ArticlesService.createOrEdit');

    const newEntity = new ArticleEntity();

    if (entity.id) {
      const oldEntity = await this.repository.findOne(entity.id);

      // validation
      if (!oldEntity) {
        result.message = 'wrong entity id';
        return result;
      }
      if (
        userRoleFromToken != 'admin' &&
        userIdFromToken != oldEntity.author.id
      ) {
        result.message = 'wrong user';
        return result;
      }

      newEntity.id = entity.id;
    }

    newEntity.title = entity.title;
    newEntity.description = entity.description;
    newEntity.text = entity.text;
    newEntity.isActive = entity.isActive;
    newEntity.articleType = entity.articleType;
    newEntity.author = await this.usersRepository.findOne(userIdFromToken);

    const resultEntity = await this.repository.save(newEntity);
    result.ok = true;
    result.resultId = resultEntity.id;

    return result;
  }
}
