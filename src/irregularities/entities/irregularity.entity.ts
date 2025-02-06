import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Irregularity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: 'bip' | 'bipbip';

  @CreateDateColumn()
  createdAt: Date;
}
