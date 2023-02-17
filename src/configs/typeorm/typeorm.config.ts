import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import {
  User,
  Recipe,
  RecipeCategory,
  Tip,
  TipCategory,
  Review,
} from '../../entities';

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
