import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { Repository } from 'typeorm';
import { ICreatedUser } from 'src/modules/users/domain/models/ICreatedUser';

@Injectable()
export class UsersRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findById(id: number): Promise<User | undefined> {
    const user = await this.usersRepository.findOneBy({
      id: id,
      companies: true,
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({
      where: { email },
      select: ['id', 'name', 'email', 'password', 'created_at', 'updated_at'],
    });

    if (!user) {
      return undefined;
    }

    return user;
  }

  async save(user: ICreatedUser): Promise<User> {
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async list(): Promise<User[]> {
    const users = await this.usersRepository.find({
      select: ['id', 'name', 'email', 'created_at', 'updated_at'],
      relations: {
        companies: true,
      },
    });

    return users;
  }
}
