import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Measurement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  value: number;

  @CreateDateColumn()
  createdAt: Date;
}
