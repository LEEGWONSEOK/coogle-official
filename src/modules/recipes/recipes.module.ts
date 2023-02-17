import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe, RecipeCategory } from '../../entities';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeCategory])],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
