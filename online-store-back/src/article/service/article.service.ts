import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/users/user.entity';
import { QueryEntityDto } from 'src/global-interface/dto/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { FindOperator, LessThan, Like, Repository } from 'typeorm';
import { ArticleEntity } from '../entity/article.entity';

class WereObj {
  title?: FindOperator<string>;
  isActive?: boolean;
  createdOn?: FindOperator<Date>;
  articleType?: string;
}

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly repository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getById(id: string): Promise<ArticleEntity> {
    return await this.repository.findOne(id);
  }

  async query(queryDto: QueryEntityDto): Promise<ArticleEntity[]> {
    if (!queryDto.maxItemCount) {
      queryDto.maxItemCount = 1;
    }

    const whereObj: WereObj = {
      isActive: true,
    };
    if (queryDto.createdOnLessThan) {
      whereObj.createdOn = LessThan(queryDto.createdOnLessThan);
    }
    if (queryDto.pattern) {
      whereObj.title = Like(`%${queryDto.pattern}%`);
    }
    if (queryDto.entityType) {
      whereObj.articleType = queryDto.entityType;
    }

    return this.repository.find({
      select: ['id', 'title', 'description', 'createdOn', 'updatedOn'],
      relations: ['author'],
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: whereObj,
    });
  }

  async createOrEdit(
    entity: ArticleEntity,
    userIdFromToken: string,
    userRoleFromToken: string,
  ): Promise<StatusMessageDto> {
    const result = new StatusMessageDto('ArticlesService.createOrEdit');
    let newEntity: ArticleEntity;

    if (entity.id) {
      newEntity = await this.repository.findOne(entity.id);
      console.log('newEntity', newEntity);
      // validation
      if (!newEntity) {
        result.message = 'wrong entity id';
        return result;
      }
      if (
        userRoleFromToken != 'admin' &&
        userIdFromToken != newEntity.author.id
      ) {
        result.message = 'wrong user';
        return result;
      }
    } else {
      newEntity = new ArticleEntity();
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
