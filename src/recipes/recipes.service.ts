import { Injectable } from '@nestjs/common';
import { RecipeRepository } from './recipe.repository';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
  constructor(private recipeRepository: RecipeRepository) {}

  createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    return this.recipeRepository.createRecipe(createRecipeDto);
  }

  // 레시피 전체 조회(카테고리별로)
  getAllRecipesByCategory(
    categoryId: number,
    filter: string,
    page: number,
    perpage: number,
  ): Promise<Recipe[]> {
    return this.recipeRepository.getAllRecipesByCategory(
      categoryId,
      filter,
      page,
      perpage,
    );
  }

  // 레시피 검색 조회
  getRecipeBySearch() {
    return this.recipeRepository.getRecipeBySearch();
  }

  // 레시피 상세 조회
  getRecipeById() {
    return this.recipeRepository.getRecipeById();
  }

  // 레시피 진행 단계 조회
  getRecipeStep() {
    return this.recipeRepository.getRecipeStep();
  }

  // 레시피 수정 페이지 조회
  getRecipeUpdatePageById() {
    return this.recipeRepository.getRecipeUpdatePageById();
  }

  // 레시피 수정
  updateRecipeById() {
    return this.recipeRepository.updateRecipeById();
  }

  // 레시피 삭제
  deleteRecipeById() {
    return this.recipeRepository.deleteRecipeById();
  }
}
