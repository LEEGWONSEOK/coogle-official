import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { Common, Recipe, Review } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
@Unique(['account'])
export class User extends Common {
  @Column()
  @ApiProperty({ description: '유저 계정' })
  account: string;

  @Column()
  @ApiProperty({ description: '유저 닉네임' })
  nickname: string;

  @Column()
  @ApiProperty({ description: '로그인 플랫폼' })
  platform: string;

  // user : recipe = 1 : N
  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipes: Recipe[];

  // user : review = 1 : N
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];
}
