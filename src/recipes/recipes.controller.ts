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
import { Recipe } from './recipe.entity';

@Controller('/recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post('/')
  createRecipe(@Body() createRecipe: RecipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipe);
  }

  // @Get('/categories/:categoryId')
  // getAllRecipesByCategory(
  //   @Param('categoryId', ParseIntPipe) categoryId: number,
  //   @Query('filter') filter: string,
  //   @Query('page', ParseIntPipe) page: number,
  //   @Query('perpage', ParseIntPipe) perpage: number,
  // ): Promise<Recipe[]> {
  //   return this.recipesService.getAllRecipesByCategory(
  //     categoryId,
  //     filter,
  //     page,
  //     perpage,
  //   );
  // }
}
