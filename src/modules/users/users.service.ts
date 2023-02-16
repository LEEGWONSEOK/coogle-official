import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from '../common/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, //private jwtService: JwtService,
  ) {}

  // 유저 로그인&회원가입
  async loginOrSignUp(accountDto: AccountDto): Promise<string> {
    const { account } = accountDto;
    const findAccount = await this.userRepository.findOne({
      where: { account },
    });

    if (findAccount) {
      return 'log in';
    } else {
      const result = this.userRepository.create({
        account,
        nickname: 'test',
        platform: 'kakao',
      });
      await this.userRepository.save(result);
      return `회원가입 완료입니다`;
    }
  }

  // 유저 전체 조회
  async userList(): Promise<User[]> {
    return this.userRepository.find();
  }

  // 유저 수정
  // async updateAccount(): Promise<string> {

  // }
}
