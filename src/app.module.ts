import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';

@Module({
  imports: [UsersModule, RecipesModule],
})
export class AppModule {}
