import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { AccountStatusEnum } from '../constants';

@Entity({ name: 'accounts' })
@Unique(['email'])
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ nullable: false })
  verification_code?: string;

  @Column({ nullable: true, type: 'timestamp' })
  verification_code_created_at?: Date;

  @Column({ nullable: true, type: 'timestamp' })
  verification_code_verified_at?: Date;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.Pending,
  })
  status: AccountStatusEnum;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: Date;
}
