import { Location } from '../../../../locations/infra/typeorm/entities/Location';
import { User } from '../../../../users/infra/typeorm/entities/User';
import { ICompany } from '../../../domain/models/ICompany';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Location, (location) => location.company)
  locations: Location[];
}
