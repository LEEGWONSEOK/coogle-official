import { Column, Entity, OneToMany } from 'typeorm';
import { Common, Tip } from '.';

@Entity()
export class TipCategory extends Common {
  @Column()
  title: string;

  // tip-category : tip = 1 : N
  @OneToMany(() => Tip, (tip) => tip.category)
  tips: Tip[];
}
