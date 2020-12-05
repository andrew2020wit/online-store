import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { FindOperator, LessThan, Like, Repository } from 'typeorm';
import { getPassWordHash } from '../auth/utils/getPassWordHash';
import { UserEntity, UserRole } from './user.entity';

class WereObj {
  name?: FindOperator<string>;
  isActive?: boolean;
  createdOn?: FindOperator<Date>;
  articleType?: string;
}

export class AdminUserQueryDTO {
  userId: string;
  role?: UserRole;
  isActive?: boolean;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  // private async getByLogin(login: string): Promise<UserEntity | undefined> {
  //   return await this.repository.findOne({ where: { login } });
  // }

  async getById(userId: string): Promise<UserEntity | undefined> {
    return await this.repository.findOne({ where: { id: userId } });
  }

  async query(queryDto: QueryEntityDto): Promise<UserEntity[]> {
    if (!queryDto.maxItemCount) {
      queryDto.maxItemCount = 1;
    }
    const whereObj: WereObj = {};
    if (queryDto.createdOnLessThan) {
      whereObj.createdOn = LessThan(queryDto.createdOnLessThan);
    }
    if (queryDto.pattern) {
      whereObj.name = Like(`%${queryDto.pattern}%`);
    }

    return this.repository.find({
      take: queryDto.maxItemCount,
      order: { createdOn: 'DESC' },
      where: whereObj,
    });
  }

  async adminChangeUser(
    adminUserQueryDTO: AdminUserQueryDTO,
  ): Promise<StatusMessageDto> {
    const resp = new StatusMessageDto('UserService.adminChangeUser');
    resp.resultId = adminUserQueryDTO.userId;

    const user = await this.repository.findOne(adminUserQueryDTO.userId);

    if (!user) {
      resp.message = 'user not found';
      return resp;
    }
    if (user.role == UserRole.admin) {
      resp.message = 'admin can not be changed!';
      return resp;
    }

    if (adminUserQueryDTO.role) {
      user.role = adminUserQueryDTO.role;
    }
    if ('isActive' in adminUserQueryDTO) {
      user.isActive = adminUserQueryDTO.isActive;
    }

    await this.repository.save(user);
    resp.ok = true;
    return resp;
  }

  async createOrEdit(
    entity: UserEntity,
    userIdFromToken?: string,
  ): Promise<StatusMessageDto> {
    const result = new StatusMessageDto('UserService.createOrEdit');

    let newEntity: UserEntity;

    if (entity.id) {
      // edit user
      if (!userIdFromToken) {
        result.message = 'user undefined';
        return result;
      }
      newEntity = await this.repository.findOne(entity.id);
      if (!newEntity) {
        result.message = 'entityId not exist';
        return result;
      }
      if (userIdFromToken != newEntity.id) {
        result.message = 'wrong user';
        return result;
      }
    } else {
      // create user
      newEntity = new UserEntity();
      newEntity.isActive = true;
      newEntity.role = UserRole.user;
    }

    newEntity.fullName = entity.fullName;
    newEntity.login = entity.login;
    newEntity.password = await getPassWordHash(entity.password);

    const resultEntity = await this.repository.save(newEntity);
    result.ok = true;
    result.resultId = resultEntity.id;

    return result;
  }
}
