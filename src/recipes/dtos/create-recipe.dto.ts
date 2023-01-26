import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  serving: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  level: number;

  @IsNotEmpty()
  @IsArray()
  contents: object[];

  @IsNotEmpty()
  @IsArray()
  ingredients: object[];

  @IsNotEmpty()
  @IsArray()
  condiments: object[];
}
