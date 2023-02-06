import { IsNotEmpty, IsString } from 'class-validator';

export class AccountDto {
  @IsNotEmpty()
  @IsString()
  account: string;
}
