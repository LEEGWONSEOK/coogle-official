import {
  Body,
  Controller,
  Post,
  Get,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccountDto, AuthCreateDto } from '../../common/dtos';
import { User } from '../../entities';

@Controller({ version: '1', path: '/users' })
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  userList(): Promise<User[]> {
    return this.usersService.userList();
  }
}

@Controller({ version: '1', path: '/auth' })
export class AuthController {
  constructor(private service: UsersService) {}

  @Post('/login/kakao')
  loginOrSignUp(
    @Body() accountDto: AccountDto,
  ): Promise<{ accessToken: string }> {
    return this.service.loginOrSignUp(accountDto);
  }
}
