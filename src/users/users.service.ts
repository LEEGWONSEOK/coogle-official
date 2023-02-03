import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from './dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, //private jwtService: JwtService,
  ) {}

  // async signUp(authCreateDto: AuthCreateDto): Promise<void> {
  //   const { account, nickname, platform } = authCreateDto;
  //   const result = this.userRepository.create({
  //     account,
  //     nickname,
  //     platform,
  //   });

  //   try {
  //     await this.userRepository.save(result);
  //   } catch (error) {
  //     if (error.code === '23505') {
  //       throw new ConflictException(
  //         `The account created with that email already exists`,
  //       );
  //     } else {
  //       throw new InternalServerErrorException();
  //     }
  //   }
  // }
  async findUser(accountDto: AccountDto): Promise<any> {
    const { account } = accountDto;
    const user = await this.userRepository.findOne({ where: { account } });
    return user;
  }
  async signUp(accountDto: AccountDto): Promise<void> {
    const { account } = accountDto;
    const result = this.userRepository.create({
      account,
      nickname: 'gggg',
      platform: 'KAKAO',
    });

    try {
      await this.userRepository.save(result);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `The account created with that email already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // async signIn(accountDto: AccountDto): Promise<{ jwtToken: string }> {
  //   const { account } = accountDto;
  //   const jwtService = this.jwtService;
  //   const payload = { account };
  //   const jwtToken = await jwtService.sign(payload);
  //   return { jwtToken };
  // }

  //  async signIn(
  //   jwtService: JwtService,
  //   accountDto: AccountDto,
  // ): Promise<{ jwtToken: string }> {
  //   const { account } = accountDto;
  //   const user = await this.userRepository.findOne({ where: { account } });

  //   if (user) {
  //     const payload = { account };
  //     const jwtToken = await jwtService.sign(payload);
  //     return { jwtToken };
  //   } else {
  //     throw new
  //   }
  // }

  // db 조회해서 있으면 signIn, signUp

  async userList(): Promise<User[]> {
    return this.userRepository.find();
  }
}
