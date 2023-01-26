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
  description: string;

  @Column()
  score: number;

  @Column()
  level: number;

  @Column({ type: 'json', nullable: true })
  contents: object[];

  @Column({ type: 'json', nullable: true })
  ingredients: object[];

  @Column({ type: 'json', nullable: true })
  condiments: object[];
  // @Column('json', { array: true })
  // contents: object[];

  // @Column('json', { array: true })
  // ingredients: object[];

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
