import { User } from '../../../../users/infra/typeorm/entities/User';
import { ICompany } from '../../../domain/models/ICompany';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('companys')
export class Company implements ICompany {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  cnpj: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.companys, {
    onDelete: 'CASCADE',
  })
  user: User;
}
