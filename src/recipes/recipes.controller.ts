import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { RecipeDto } from './dtos';
import { RecipesService } from './recipes.service';
import { Recipe } from '../entities';

@Controller({ version: '1', path: 'recipes' })
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post('/')
  createRecipe(@Body() createRecipe: RecipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipe);
  }

  @Get('/categories')
  getAllRecipesByCategory(
    //@Param('categoryId', ParseIntPipe) categoryId,
    @Query('filter') filter: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('perpage', ParseIntPipe) perpage: number,
  ): Promise<Recipe[]> {
    return this.recipesService.getAllRecipesByCategory(
      //categoryId,
      filter,
      page,
      perpage,
    );
  }
}
