import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { RecipeDto } from './dtos';
import { RecipesService } from './recipes.service';
import { Recipe } from '../entities';
import { PaginationDto } from '../utils/dtos';
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
  @Get('/categories/:categroyId')
  getAllRecipesByCategory(
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
  // @Get('/search')
  // getRecipeBySearch(
  //   @Query('search') search: string,
  //   @Query('page', ParseIntPipe) page: number,
  // ): Promise<Recipep[]> {
  //   return this.recipesService.getRecipeBySearch(search, page);
  // }
}
