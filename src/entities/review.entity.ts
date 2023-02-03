import { Column, Entity, ManyToOne } from 'typeorm';
import { Common, User, Recipe } from '.';

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
