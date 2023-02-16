import { IsNotEmpty, IsNumber, IsString, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '소세지 야채볶음',
    description: '레시피 제목',
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 2,
    description: '인분',
    required: true,
  })
  serving: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '쉽고 간단하게 만들어 먹을 수 있는 소야볶',
    description: '레시피 설명',
    required: true,
  })
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: '레시피 난이도',
    required: true,
  })
  level: number;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      { step: 1, image: 's3_url', text: '1번째 단계 설명 text' },
      { step: 2, image: 's3_url', text: '2번째 단계 설명 text' },
      { step: 3, image: 's3_url', text: '3번째 단계 설명 text' },
    ],
    description: '레시피 상세 단계별 내용',
    required: true,
  })
  contents: object[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      { title: '재료명', amount: '수량' },
      { title: '재료명', amount: '수량' },
      { title: '재료명', amount: '수량' },
    ],
    description: '레시피 재료',
    required: true,
  })
  ingredients: object[];

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    example: [
      { title: '조미료명', amount: '수량' },
      { title: '조미료명', amount: '수량' },
    ],
    description: '레시피 조미료',
    required: true,
  })
  condiments: object[];

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: '[FK] 카테고리' })
  categoryId: number;
}
