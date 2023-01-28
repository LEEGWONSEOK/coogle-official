import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { ReviewsModule } from './reviews/reviews.module';
import { TipsModule } from './tips/tips.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    RecipesModule,
    ReviewsModule,
    TipsModule,
  ],
})
export class AppModule {}
