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
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { User } from '../../entities';

@Controller({ version: '1', path: '/users' })
@ApiTags('유저 API')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // 유저 전체 조회
  @Get()
  @ApiOperation({ summary: '유저 조회 API', description: '유저 조회' })
  @ApiCreatedResponse({ description: '유저 조회', type: User })
  userList(): Promise<User[]> {
    return this.usersService.userList();
  }

  // 유저 정보 조회
}

@Controller({ version: '1', path: '/auth' })
@ApiTags('로그인/회원가입 API')
export class AuthController {
  constructor(private service: UsersService) {}

  @Post('/login/kakao')
  @ApiOperation({ summary: '유저 조회 API', description: '유저 조회' })
  @ApiCreatedResponse({ description: '유저 조회', type: Object })
  loginOrSignUp(
    @Body() accountDto: AccountDto,
  ): Promise<{ accessToken: string }> {
    return this.service.loginOrSignUp(accountDto);
  }
}
