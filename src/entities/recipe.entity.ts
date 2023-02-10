import { Column, Entity, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Common, User, RecipeCategory, Review } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Recipe extends Common {
  @Column()
  @ApiProperty({ description: '레시피 제목' })
  title: string;

  @Column()
  @ApiProperty({ description: '인분' })
  serving: number;

  @Column()
  @ApiProperty({ description: '레시피 설명' })
  description: string;

  @Column({ type: 'float', default: 0 })
  @ApiProperty({ description: '레시피 평점' })
  average_score: number;

  @Column()
  @ApiProperty({ description: '레시피 난이도' })
  level: number;

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ description: '레시피 내용' })
  contents: object[];

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ description: '레시피 재료' })
  ingredients: object[];

  @Column({ type: 'json', nullable: true })
  @ApiProperty({ description: '레시피 조미료' })
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
  @ApiProperty({ description: '[FK] 유저' })
  userId: number;

  @Column()
  @ApiProperty({ description: '[FK] 카테고리' })
  categoryId: number;

  // recipe : review = 1 : N
  @OneToMany(() => Review, (review) => review.recipe)
  reviews: Review[];
}
