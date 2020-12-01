import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryDto } from 'src/global-interface/dto/query.dto';
import { LessThan, Like, Repository } from 'typeorm';
import { StatusMessageDto } from './../global-interface/dto/status-message.dto';
import { GoodsEntity } from './goods.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private repository: Repository<GoodsEntity>,
  ) {}

  async getById(id: string): Promise<GoodsEntity> {
    return await this.repository.findOne(id);
  }

  async query(queryDto: QueryDto): Promise<GoodsEntity[]> {
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

  async create(entity: GoodsEntity) {
    const response = new StatusMessageDto('GoodsService:create');
    response.ok = false;

    // Validation
    if (!entity || entity.id || !entity.name || !entity.price) {
      response.message = 'bad entity';
      return response;
    }

    const newEntity = new GoodsEntity();
    newEntity.bigPhotoUrl = entity.bigPhotoUrl;
    newEntity.description = entity.description;
    newEntity.name = entity.name;
    newEntity.price = entity.price;
    newEntity.smallPhotoUrl = entity.smallPhotoUrl;

    const resEntity = await this.repository.save(newEntity);
    response.ok = true;
    response.message = 'Ok';
    response.resultId = resEntity.id;
  }

  async update(entity: GoodsEntity) {
    const response = new StatusMessageDto('GoodsService:update');
    response.ok = false;
    // Validation
    if (!entity || !entity.id || !entity.name || !entity.price) {
      response.message = 'bad entity';
      return response;
    }

    const newEntity = await this.getById(entity.id);

    if (!newEntity) {
      response.message = 'entity not exist';
      return response;
    }

    newEntity.bigPhotoUrl = entity.bigPhotoUrl;
    newEntity.description = entity.description;
    newEntity.name = entity.name;
    newEntity.price = entity.price;
    newEntity.smallPhotoUrl = entity.smallPhotoUrl;

    const resEntity = await this.repository.save(newEntity);
    response.ok = true;
    response.message = 'Ok';
    response.resultId = resEntity.id;
  }

  async activate(id: string, status: boolean) {
    const response = new StatusMessageDto('GoodsService:delete');
    response.ok = false;

    const newEntity = await this.getById(id);

    if (!newEntity) {
      response.message = 'entity not exist';
      return response;
    }

    newEntity.isActive = status;

    const resEntity = await this.repository.save(newEntity);
    response.ok = true;
    response.message = `Status: ${status}`;
    response.resultId = resEntity.id;
  }
}
