import { Module } from '@nestjs/common';
import {
  UsersModule,
  RecipesModule,
  RecipeCategoriesModule,
  TipsModule,
  TipCategoriesModule,
  ReviewsModule,
} from './modules';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm/typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RecipesModule,
    ReviewsModule,
    TipsModule,
    RecipeCategoriesModule,
    TipCategoriesModule,
  ],
})
export class AppModule {}
