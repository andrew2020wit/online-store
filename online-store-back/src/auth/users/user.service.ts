import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryEntityDto } from 'src/global-interface/dto/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { FindOperator, LessThan, Like, Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAdminView } from '../dto/user-admin-view.dto';
import { UserEntity } from './user.entity';

class WereObj {
  name?: FindOperator<string>;
  isActive?: boolean;
  createdOn?: FindOperator<Date>;
  articleType?: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  private async getByLogin(login: string): Promise<UserEntity | undefined> {
    return await this.repository.findOne({ where: { login } });
  }

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

  async findAllUsers(): Promise<UserAdminView[] | undefined> {
    return await this.repository.find();
  }

  async createUser(createUserDto: CreateUserDto): Promise<StatusMessageDto> {
    if (await this.getByLogin(createUserDto.login)) {
      return {
        message: `user ${createUserDto.login} already exist`,
        source: 'createUser',
        ok: false,
      };
    }

    if (
      await this.repository.findOne({
        where: { fullName: createUserDto.fullName },
      })
    ) {
      return {
        message: `fullName ${createUserDto.fullName} already exist`,
        source: 'createUser',
        ok: false,
      };
    }

    if (!createUserDto.password && createUserDto.password.length < 2) {
      return { message: 'password incorrect', source: 'createUser', ok: false };
    }

    const password2 = await bcrypt.hash(createUserDto.password, 10);

    await this.repository.save({
      login: createUserDto.login,
      fullName: createUserDto.fullName,
      password: password2,
    });

    return {
      message: `user ${createUserDto.login} created`,
      source: 'createUser',
      ok: true,
    };
  }

  async editUser(
    userId: string,
    userEditDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    if (!this.getById(userId)) {
      return {
        message: `not find user by userId ${userId}`,
        source: 'editUser',
        ok: false,
      };
    }

    const password2 = await bcrypt.hash(userEditDto.password, 10);
    try {
      await this.repository.save({
        id: userId,
        login: userEditDto.login,
        fullName: userEditDto.fullName,
        password: password2,
      });
    } catch (err) {
      return {
        message: err,
        source: 'editUser',
        ok: false,
      };
    }

    return {
      message: `user ${userEditDto.login} save`,
      source: 'editUser',
      ok: true,
    };
  }
}
