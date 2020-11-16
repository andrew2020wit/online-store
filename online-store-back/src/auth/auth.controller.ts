import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StatusMessageDto } from 'src/global-interface/dto/status-message.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTokenDTO } from './dto/token-object.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithJwtUserExtDto } from './interfaces/request-with-user-ext.interface';
import { RequestWithJwtUserDto } from './interfaces/request-with-user.interface';
import { UsersService } from './users/users.service';

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // users registration
  @Post('create-user')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('edit-user')
  async editUser(
    @Request() req: RequestWithJwtUserExtDto,
    @Body() createUserDto: CreateUserDto,
  ): Promise<StatusMessageDto> {
    // console.log('RequestWithJwtUserExtDto-user:', req.user);
    // console.log('createUserDto:', createUserDto);

    return await this.usersService.editUser(req.user.sub, createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('get-token-obj')
  async login(@Request() req: RequestWithJwtUserDto): Promise<JWTokenDTO> {
    return this.authService.getTokenObject(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('update-token')
  async updateToken(
    @Request() req: RequestWithJwtUserExtDto,
  ): Promise<JWTokenDTO> {
    console.log('RequestWithJwtUserExtDto-user:', req.user);
    return await this.authService.updateToken(req.user);
  }
}
