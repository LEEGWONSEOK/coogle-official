import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { RecipeCategory } from 'src/entities';
import { RecipeCategoriesService } from './recipe-categories.service';
import { RecipeCategoryDto } from 'src/utils/dtos/recipe-category.dto';

@Controller({ version: '1', path: 'recipe-categories' })
export class RecipeCategoriesController {
  constructor(private recipeCategoriesService: RecipeCategoriesService) {}

  // 레시피 카테고리 생성
  @Post('/')
  createRecipeCategory(
    @Body() createRecipeCategoryDto: RecipeCategoryDto,
  ): Promise<RecipeCategory> {
    return this.recipeCategoriesService.createRecipeCategory(
      createRecipeCategoryDto,
    );
  }

  // 레시피 카테고리 전체 조회
  @Get('/')
  getAllRecipeCategories(): Promise<RecipeCategory[]> {
    return this.recipeCategoriesService.getAllRecipeCategories();
  }

  // 레시피 카테고리 수정
  @Patch('/:categoryId')
  updateRecipeCategory(
    @Param('categoryId') categoryId: number,
    @Body() updateRecipeCategory: RecipeCategory,
  ): Promise<string> {
    return this.recipeCategoriesService.updateRecipeCategory(
      categoryId,
      updateRecipeCategory,
    );
  }

  // 레시피 카테고리 삭제
  @Delete('/:categoryId')
  deleteRecipeCategory(
    @Param('categoryId') categoryId: number,
  ): Promise<string> {
    return this.recipeCategoriesService.deleteRecipeCategory(categoryId);
  }
}
