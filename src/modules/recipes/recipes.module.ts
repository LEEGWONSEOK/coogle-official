import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe, RecipeCategory } from '../../entities';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeCategory]), UsersModule],
  controllers: [RecipesController],
  providers: [RecipesService],
})
export class RecipesModule {}
