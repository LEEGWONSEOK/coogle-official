import {
  Body,
  Controller,
  Post,
  Get,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AccountDto, AuthCreateDto } from '../utils/dtos';
import { User } from '../entities';

@Controller('/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  userList(): Promise<User[]> {
    return this.usersService.userList();
  }
}

@Controller('/auth')
export class AuthController {
  constructor(private usersService: UsersService) {}

  @Post('/sign-up')
  signUp(@Body() authCreateDto: AuthCreateDto): Promise<void> {
    return this.usersService.signUp(authCreateDto);
  }

  // @Post('/sign-in/kakao')
  // signIn(@Body() accountDto: AccountDto): Promise<any> {
  //   const findUser = this.usersService.findUser(accountDto);
  //   if (findUser) {
  //     return this.usersService.signIn(accountDto);
  //   } else {
  //     return this.usersService.signUp(accountDto);
  //   }
  // }

  // @Post('/sign-in')
  // signIn(@Body() body: any, @Response() res): Promise<any> {
  //   try {
  //     const { code, domain } = body;
  //     if (!code || !domain) {
  //       throw new BadRequestException(`카카오 정보가 없습니다`);
  //     }
  //     const kakao = await this.usersService.kakaoLogin({ code, domain });

  //     console.log(`kakaoUserInfo : ${JSON.stringify(kakao)}`);
  //     if (!kakao.id) {
  //       throw new BadRequestException(`카카오 id 정보가 없습니다.`);
  //     }
  //     res.send({
  //       user: kakao,
  //       message: `success`,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     throw new UnauthorizedException();
  //   }
  // }
}
