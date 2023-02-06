import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from '../utils/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, //private jwtService: JwtService,
  ) {}

  async login(accountDto: AccountDto): Promise<string> {
    // 회원정보가 있는지 찾아보기
    const user = await this.userRepository.findOne({
      where: { account: accountDto.account },
    });

    // 회원정보가 없다면? -> 회원가입
    if (!user) {
      const newUser = this.userRepository.create({
        account: accountDto.account,
      });
      await this.userRepository.save(newUser);
      return `회원가입이 완료되었습니다.`;
    }
    // 회원정보가 있으면? -> 로그인
    return `로그인이 완료되었습니다.`;
  }

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
