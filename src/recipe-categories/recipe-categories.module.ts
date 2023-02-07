import { Module } from '@nestjs/common';
import { RecipeCategoriesController } from './recipe-categories.controller';
import { RecipeCategoriesService } from './recipe-categories.service';

@Module({
  controllers: [RecipeCategoriesController],
  providers: [RecipeCategoriesService],
})
export class RecipeCategoriesModule {}
