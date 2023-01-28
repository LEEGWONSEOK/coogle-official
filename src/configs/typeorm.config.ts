import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Recipe, RecipeCategory } from 'src/recipes/entities';
import { Review } from 'src/reviews/entities';
import { Tip, TipCategory } from 'src/tips/entities';
import { User } from 'src/users/entities';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'db',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'coogle',
  entities: [
    __dirname + '/../**/*.entitiy.{js, ts}',
    User,
    Recipe,
    RecipeCategory,
    Tip,
    TipCategory,
    Review,
  ],
  synchronize: true,
};
