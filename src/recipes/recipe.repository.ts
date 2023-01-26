import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CustomRepository } from 'src/decorators/typeorm-ex.decorator';
import { CreateRecipeDto } from './dtos/create-recipe.dto';

@CustomRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    const {
      title,
      serving,
      description,
      level,
      contents,
      ingredients,
      condiments,
    } = createRecipeDto;
    const result = this.create({
      title,
      serving,
      description,
      score: 0,
      level,
      contents,
      ingredients,
      condiments,
    });
    await this.save(result);
    return result;
  }

  async getAllRecipesByCategory(
    categoryId: number,
    filter: string,
    page: number,
    perpage: number,
  ): Promise<Recipe[]> {
    return this.find({
      select: {},
    });
  }
}
