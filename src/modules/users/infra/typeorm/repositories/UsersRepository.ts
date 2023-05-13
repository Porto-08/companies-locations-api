import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async save(user: User): Promise<User> {
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async list(): Promise<User[]> {
    const users = await this.usersRepository.find();

    return users;
  }
}
