import { Column, Entity, ManyToOne } from 'typeorm';
import { Common } from 'src/base/common.entity';
import { User } from 'src/users/entities';
import { Recipe } from 'src/recipes/entities';

@Entity()
export class Review extends Common {
  @Column()
  review: string;

  @Column()
  score: number;

  // review : user = N : 1
  @ManyToOne(() => User, (user) => user.reviews)
  user: User;

  // review : recipe = N : 1
  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  recipe: Recipe;
}
