import { User } from '../../../../users/infra/typeorm/entities/User';
import { ICompany } from '../../../domain/models/ICompany';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.companys)
  user: User;
}
