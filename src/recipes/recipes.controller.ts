import { Body, Controller, Post } from '@nestjs/common';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipesService } from './recipes.service';
import { Recipe } from './recipe.entity';

@Controller('/recipes')
export class RecipesController {
  constructor(private recipesService: RecipesService) {}

  @Post('/')
  createRecipe(@Body() createRecipe: CreateRecipeDto): Promise<Recipe> {
    return this.recipesService.createRecipe(createRecipe);
  }
}
