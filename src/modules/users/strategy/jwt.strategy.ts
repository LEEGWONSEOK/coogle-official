import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../../entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {
    super({
      secretOrKey: 'secretkey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload) {
    const { account } = payload;
    const authorizedUser: User = await this.repo.findOne({
      where: { account },
    });
    if (!authorizedUser) {
      throw new UnauthorizedException();
    }
    return authorizedUser;
  }
}
