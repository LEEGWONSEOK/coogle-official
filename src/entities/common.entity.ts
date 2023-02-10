import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class Common {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id' })
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: '생성일' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ description: '수정일' })
  updateAt: Date;
}
