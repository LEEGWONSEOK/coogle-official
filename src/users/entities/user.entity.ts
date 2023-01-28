import { Column, Entity, OneToMany } from 'typeorm';
import { Common } from 'src/base/common.entity';
import { Recipe } from 'src/recipes/entities';
import { Review } from 'src/reviews/entities';

@Entity()
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
