import { IsNotEmpty, IsString } from 'class-validator';
import { AccountDto } from './account.dto';

export class AuthCreateDto extends AccountDto {
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
