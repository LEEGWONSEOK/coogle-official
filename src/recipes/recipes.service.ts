import { Injectable } from '@nestjs/common';
import { RecipeDto } from './dtos';
import { Recipe } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  // service로직 : 레시피 생성
  async createRecipe(createRecipeDto: RecipeDto): Promise<Recipe> {
    const {
      title,
      serving,
      description,
      level,
      contents,
      ingredients,
      condiments,
    } = createRecipeDto;

    const result = this.recipeRepository.create({
      title,
      serving,
      description,
      average_score: 0,
      level,
      contents,
      ingredients,
      condiments,
    });

    await this.recipeRepository.save(result);
    return result;
  }

  // 레시피 전체 조회(카테고리별로)
  async getAllRecipesByCategory(
    //categoryId: number,
    filter = 'latest',
    page = 1,
    perpage = 10,
  ): Promise<Recipe[]> {
    return this.recipeRepository.find({
      select: {
        title: true,
        description: true,
        average_score: true,
        level: true,
      },
      where: {},
    });
  }
}
//   // 레시피 검색 조회
//   getRecipeBySearch() {
//     return this.recipeRepository.
//   }

//   // 레시피 상세 조회
//   getRecipeById() {
//     return this.recipeRepository.
//   }

//   // 레시피 진행 단계 조회
//   getRecipeStep() {
//     return this.recipeRepository.
//   }

//   // 레시피 수정 페이지 조회
//   getRecipeUpdatePageById() {
//     return this.recipeRepository.getRecipeUpdatePageById();
//   }

//   // 레시피 수정
//   updateRecipeById() {
//     return this.recipeRepository.updateRecipeById();
//   }

//   // 레시피 삭제
//   deleteRecipeById() {
//     return this.recipeRepository.deleteRecipeById();
//   }
//
