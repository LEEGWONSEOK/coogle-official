import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Common, User, Recipe } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Review extends Common {
  @Column()
  @ApiProperty({ description: '리뷰 내용' })
  title: string;

  @Column()
  @ApiProperty({ description: '리뷰 점수' })
  score: number;

  // review : user = N : 1
  @ManyToOne(() => User, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: User;

  // review : recipe = N : 1
  @ManyToOne(() => Recipe, (recipe) => recipe.reviews)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipe;

  @Column()
  @ApiProperty({ description: '[FK] 유저 Id' })
  userId: number;

  @Column()
  @ApiProperty({ description: '[FK] 레시피 Id' })
  recipeId: number;
}
