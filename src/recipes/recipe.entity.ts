import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  serving: number;

  @Column()
  description: number;

  @Column()
  score: number;

  @Column()
  level: number;

  @Column('json', { array: true })
  contents: object[];

  @Column('json', { array: true })
  ingredients: object[];

  @Column('json', { array: true })
  condiments: object[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
