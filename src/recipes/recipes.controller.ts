import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { Recipe } from '../entities';
import { PaginationDto, RecipeDto } from '../utils/dtos';
import { BadRequestException } from '@nestjs/common';

@Controller({ version: '1', path: 'recipes' })
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  // 레시피 생성
  @Post('/')
  createRecipe(@Body() createRecipe: RecipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipe);
  }

  // 레시피 전체 조회(필터 기준)
  @Get('/categories/:categoryId')
  getAllRecipes(
    @Param('categoryId') categoryId: number,
    @Query('filter') filter: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    if (filter === 'latest') {
      return this.recipesService.getAllRecipesByLatest(
        categoryId,
        paginationDto,
      );
    } else if (filter === 'popularity') {
      return this.recipesService.getAllRecipesByPopularity(
        categoryId,
        paginationDto,
      );
    } else if (filter === 'generated') {
      return this.recipesService.getAllRecipesByGenerated(
        categoryId,
        paginationDto,
      );
    } else {
      throw new BadRequestException('Invalid filter');
    }
  }

  // 레시피 검색 조회
  @Get('/search')
  getAllRecipesBySearch(
    @Query('q') q: string,
    @Query() paginationDto: PaginationDto,
  ): Promise<Recipe[]> {
    return this.recipesService.getAllRecipesBySearch(q, paginationDto);
  }

  // 레시피 상세 조회
  @Get('/:recipeId')
  getRecipe(@Param('recipeId') recipeId: number): Promise<Recipe> {
    return this.recipesService.getRecipe(recipeId);
  }

  // 레시피 step 조회
  @Get('/:recipeId/step')
  getRecipeStep(@Param('recipeId') recipeId: number): Promise<Recipe> {
    return this.recipesService.getRecipeStep(recipeId);
  }

  // 레시피 수정 페이지 조회
  @Get('/:recipeId/update')
  getRecipeUpdate(@Param('recipeId') recipeId: number): Promise<Recipe> {
    return this.recipesService.getRecipeUpdate(recipeId);
  }

  // 레시피 수정
  @Patch('/:recipeId')
  updateRecipe(@Param('recipeId') recipeId: number): Promise<void> {
    return this.recipesService.updateRecipe(recipeId);
  }

  // 레시피 삭제
  @Delete('/:recipeId')
  deleteRecipe(@Param('recipeId') recipeId: number): Promise<void> {
    return this.recipesService.deleteRecipe(recipeId);
  }
}
