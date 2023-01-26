import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RecipesModule } from './recipes/recipes.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, RecipesModule],
})
export class AppModule {}
