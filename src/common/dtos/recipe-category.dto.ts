import { IsNotEmpty, IsString } from 'class-validator';

export class RecipeCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
