import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StatusMessageDto } from 'src/shared/status-message.dto';
import { getConnection } from 'typeorm';
import { UserAdminView } from './dto/user-admin-view.dto';
import { AdminJwtAuthGuard } from './guards/admin-jwt-auth.guard';
import { UserEntity } from './users/user.entity';
import { UsersService } from './users/users.service';

@Controller('api/auth/admin')
export class AuthAdminController {
  constructor(private usersService: UsersService) {}

  @Get('users')
  @UseGuards(AdminJwtAuthGuard)
  async usersList(): Promise<UserAdminView[] | undefined> {
    return await this.usersService.findAllUsers();
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
