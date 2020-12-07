import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { QueryEntityDto } from 'src/global-interface/query-entity.dto';
import { StatusMessageDto } from 'src/global-interface/status-message.dto';
import { AdminJwtAuthGuard } from '../auth/guards/admin-jwt-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithJwtUserExtDto } from '../auth/interfaces/request-with-user-ext.interface';
import { UserEntity, UserRole } from './user.entity';
import { AdminUserQueryDTO, UserService } from './user.service';

@ApiTags('user')
@Controller('api/user')
export class UserController {
  constructor(private entityService: UserService) {}

  @Get('get-by-id/:id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id') id: string,
    @Request() req: RequestWithJwtUserExtDto,
  ): Promise<UserEntity> {
    const user = req.user;
    if (user.sub != 'id' && user.role != UserRole.admin) {
      return null;
    }
    return await this.entityService.getById(id);
  }

  @Post('query-users')
  @UseGuards(AdminJwtAuthGuard)
  async query(@Body() queryDto: QueryEntityDto): Promise<UserEntity[]> {
    return await this.entityService.query(queryDto);
  }

  @Post('admin-change-user')
  @UseGuards(AdminJwtAuthGuard)
  async adminChangeUser(
    @Body() adminUserQueryDTO: AdminUserQueryDTO,
  ): Promise<StatusMessageDto> {
    return await this.entityService.adminChangeUser(adminUserQueryDTO);
  }

  @Post('create-user')
  async register(@Body() user: UserEntity): Promise<StatusMessageDto> {
    console.log('user: ', user);

    return await this.entityService.createOrEdit(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit-user')
  async editUser(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() user: UserEntity,
  ): Promise<StatusMessageDto> {
    return await this.entityService.createOrEdit(user, req.user.sub);
  }
}
