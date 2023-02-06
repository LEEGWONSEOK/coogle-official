import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ReviewDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  score: number;
}
