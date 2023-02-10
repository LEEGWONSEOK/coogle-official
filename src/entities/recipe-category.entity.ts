import { Column, Entity, OneToMany } from 'typeorm';
import { Common, Recipe } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RecipeCategory extends Common {
  @Column()
  @ApiProperty({ description: '레시피 카테고리 이름' })
  title: string;

  // recipe-category : recipe = 1 : N
  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];
}
