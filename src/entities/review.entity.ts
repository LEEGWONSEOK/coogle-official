import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Common, User, Recipe } from '.';

@Entity()
export class Review extends Common {
  @Column()
  title: string;

  @Column()
  score: number;

  // review : user = N : 1
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn()
  user: User;

  // review : recipe = N : 1
  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  @JoinColumn()
  recipe: Recipe;
}
