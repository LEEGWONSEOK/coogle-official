import { Column, Entity, ManyToOne } from 'typeorm';
import { Common, TipCategory } from '.';

@Entity()
export class Tip extends Common {
  @Column()
  title: string;

  @Column()
  content: string;

  // tip : tip-category = N : 1
  @ManyToOne(() => TipCategory, (category) => category.tips)
  category: TipCategory;
}
