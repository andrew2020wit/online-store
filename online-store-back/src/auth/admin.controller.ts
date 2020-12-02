import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { UserAdminView } from './dto/user-admin-view.dto';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { UserEntity } from './users/user.entity';

@ApiTags('auth-users')
@Controller('api/admin')
export class AuthAdminController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get('users')
  @UseGuards(AdminJwtAuthGuard)
  async usersList(
    @Query() quer: { pattern: string },
  ): Promise<UserAdminView[] | undefined> {
    const pat = quer.pattern;
    return await this.userRepository.find({
      take: 200,
      order: { createdOn: 'DESC' },
      where: [
        {
          login: Like(`%${pat}%`),
        },
        { fullName: Like(`%${pat}%`) },
      ],
    });
  }

  @Get('user')
  @UseGuards(AdminJwtAuthGuard)
  async getUser(
    @Query() quer: { userId: string },
  ): Promise<UserAdminView | undefined> {
    return await this.userRepository.findOne(quer.userId);
  }

  @Get('change-user')
  @UseGuards(AdminJwtAuthGuard)
  async changeUser(
    @Query() quer: { userId: string; property: string; value: string },
  ): Promise<UserAdminView | undefined> {
    const user = await this.userRepository.findOne(quer.userId);
    let changed = false;
    if (!user) {
      return undefined;
    }
    if (user.role == 'admin') {
      console.log('admin cannot be changed');
      return undefined;
    }
    if (quer.property == `isActive`) {
      if (quer.value == 'true') {
        user.isActive = true;
        changed = true;
      }
      if (quer.value == 'false') {
        user.isActive = false;
        changed = true;
      }
    }
    if (quer.property == `role`) {
      if (quer.value == 'manager') {
        user.role = 'manager';
        changed = true;
      }
      if (quer.value == 'client') {
        user.role = 'client';
        changed = true;
      }
    }
    if (changed) {
      return await this.userRepository.save(user);
    } else return undefined;
  }
}
