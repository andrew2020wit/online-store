import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { getConnection, Like, Repository } from 'typeorm';
import { UserAdminView } from './dto/user-admin-view.dto';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { UserEntity } from './users/user.entity';

@Controller('api/admin')
export class AuthAdminController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @Get('users')
  @UseGuards(AdminJwtAuthGuard)
  async usersList(@Query() { pattern }): Promise<UserAdminView[] | undefined> {
    const pat = pattern.trim();
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

  @Post('activate-user')
  @UseGuards(AdminJwtAuthGuard)
  async activateUser(
    @Body() body: { userId: string; isActive: boolean },
  ): Promise<StatusMessageDto> {
    try {
      console.log('activateUser');
      await getConnection()
        .createQueryBuilder()
        .update(UserEntity)
        .set({ isActive: body.isActive })
        .where('id = :id and role != :role', { id: body.userId, role: 'admin' })
        .execute();
      return { message: body.userId, source: 'activateUser', ok: true };
    } catch {
      return { message: body.userId, source: 'activateUser', ok: false };
    }
  }
}
