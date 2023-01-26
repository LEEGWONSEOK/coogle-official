import { Module } from '@nestjs/common';
import { TypeOrmExModule } from 'src/decorators/typeorm-ex.module';

import { RecipeRepository } from './recipe.repository';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([RecipeRepository])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
