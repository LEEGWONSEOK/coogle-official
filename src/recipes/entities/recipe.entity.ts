import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { Common } from 'src/base/common.entity';
import { User } from 'src/users/entities';
import { RecipeCategory } from '.';
import { Review } from 'src/reviews/entities';

@Entity()
export class Recipe extends Common {
  @Column()
  title: string;

  @Column()
  serving: number;

  @Column()
  description: string;

  @Column()
  average_score: number;

  @Column()
  level: number;

  @Column({ type: 'json', nullable: true })
  contents: object[];

  @Column({ type: 'json', nullable: true })
  ingredients: object[];

  @Column({ type: 'json', nullable: true })
  condiments: object[];

  // recipe : user = N : 1
  @ManyToOne(() => User, (user) => user.recipes)
  user: User;

  // recipe : recipe-category = N : 1
  @ManyToOne(() => RecipeCategory, (category) => category.recipes)
  category: RecipeCategory;

  // recipe : review = 1 : N

  // user : review = 1 : N
  @OneToMany(() => Review, (review) => review.recipe)
  reviews: Review[];
}
