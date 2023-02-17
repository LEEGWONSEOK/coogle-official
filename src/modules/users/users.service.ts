import {
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { JwtService } from '@nestjs/jwt';
import { AccountDto } from '../../common/dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 유저 로그인&회원가입
  async loginOrSignUp(
    accountDto: AccountDto,
  ): Promise<{ accessToken: string }> {
    const { account } = accountDto;
    const jwtService = this.jwtService;
    const findAccount = await this.repo.findOne({
      where: { account },
    });

    if (findAccount) {
      const payload = { account };
      const accessToken = await jwtService.sign(payload);
      console.log('sign up complete');
      return { accessToken };
    } else {
      // 회원가입
      const result = this.repo.create({
        account,
        nickname: '왕초보',
        platform: 'kakao',
      });
      await this.repo.save(result);
      const payload = { account };
      const accessToken = await jwtService.sign(payload);
      console.log('sign up and sign in complete');
      return { accessToken };
    }
  }

  // async loginOrSignUp(accountDto: AccountDto): Promise<string> {
  //   const { account } = accountDto;
  //   const findAccount = await this.repo.findOne({
  //     where: { account },
  //   });

  //   if (findAccount) {
  //     // 로그인
  //     return 'log in';
  //   } else {
  //     // 회원가입
  //     const result = this.repo.create({
  //       account,
  //       nickname: 'test',
  //       platform: 'kakao',
  //     });
  //     await this.repo.save(result);
  //     return `회원가입 완료입니다`;
  //   }
  // }

  // 유저 전체 조회
  async userList(): Promise<User[]> {
    return this.repo.find();
  }

  // 유저 수정
  // async updateAccount(): Promise<string> {

  // }
}
