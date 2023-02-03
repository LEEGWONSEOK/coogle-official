import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Common, Recipe, Review } from '.';

@Entity()
@Unique(['account'])
export class User extends Common {
  @Column()
  account: string;

  @Column()
  nickname: string;

  @Column()
  platform: string;

  // user : recipe = 1 : N
  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  // user : review = 1 : N
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
