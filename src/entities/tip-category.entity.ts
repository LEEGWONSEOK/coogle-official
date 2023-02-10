import { Column, Entity, OneToMany } from 'typeorm';
import { Common, Tip } from '.';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class TipCategory extends Common {
  @Column()
  @ApiProperty({ description: '팁 카테고리 이름' })
  title: string;

  // tip-category : tip = 1 : N
  @OneToMany(() => Tip, (tip) => tip.category)
  tips: Tip[];
}
