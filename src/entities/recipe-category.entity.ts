import { Column, Entity, OneToMany } from 'typeorm';
import { Common, Recipe } from '.';

@Entity()
export class RecipeCategory extends Common {
  @Column()
  title: string;

  // recipe-category : recipe = 1 : N
  @OneToMany(() => Recipe, (recipe) => recipe.category)
  recipes: Recipe[];
}
