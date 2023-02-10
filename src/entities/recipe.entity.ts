import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Common, User, RecipeCategory, Review } from '.';

@Entity()
export class Recipe extends Common {
  @Column()
  title: string;

  @Column()
  serving: number;

  @Column()
  description: string;

  @Column({ type: 'float', default: 0 })
  average_score: number;

  @Column()
  level: number;

  @Column({ type: 'json', nullable: true })
  contents: object[];

  @Column({ type: 'json', nullable: true })
  ingredients: object[];

  @Column({ type: 'json', nullable: true })
  condiments: object[];

  // recipe : recipe-category = N : 1
  @ManyToOne(() => RecipeCategory, (category) => category.recipes)
  @JoinColumn({ name: 'categoryId' })
  category: RecipeCategory;

  // recipe : user = N : 1
  @ManyToOne(() => User, (user) => user.recipes)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;

  @Column()
  categoryId: number;

  // recipe : review = 1 : N
  @OneToMany(() => Review, (review) => review.recipe)
  reviews: Review[];
}
