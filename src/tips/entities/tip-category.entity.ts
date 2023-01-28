import { Column, Entity, OneToMany } from 'typeorm';
import { Common } from 'src/base/common.entity';
import { Tip } from './tip.entity';

@Entity()
export class TipCategory extends Common {
  @Column()
  title: string;

  // tip-category : tip = 1 : N
  @OneToMany(() => Tip, (tip) => tip.category)
  tips: Tip[];
}
