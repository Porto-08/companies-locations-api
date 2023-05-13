import { ICreatedUser } from '../models/ICreatedUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  save(user: ICreatedUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  findById(id: number): Promise<IUser | undefined>;
  delete(id: string): Promise<void>;
  list(): Promise<IUser[]>;
}
