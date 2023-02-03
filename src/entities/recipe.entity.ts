import { Column, Entity, OneToMany, ManyToOne } from 'typeorm';
import { Common, User, RecipeCategory, Review } from '.';

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
