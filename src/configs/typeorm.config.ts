import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Recipe } from 'src/recipes/recipe.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'coogle',
  entities: [__dirname + '/../**/*.entitiy.{js, ts}', Recipe],
  synchronize: true,
};
