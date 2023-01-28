import { Column, Entity, ManyToOne } from 'typeorm';
import { Common } from 'src/base/common.entity';
import { TipCategory } from './tip-category.entity';

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
