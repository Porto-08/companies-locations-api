import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { ICreatedUser } from '../domain/models/ICreatedUser';
import * as bcrypt from 'bcrypt';
import { User } from '../infra/typeorm/entities/User';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async execute(user: ICreatedUser) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      user.email,
    );

    if (userAlreadyExists) {
      throw new BadRequestException('User already exists.');
    }

    const passwordHash = await bcrypt.hash(user.password, 8);

    const createdUser = await this.usersRepository.save({
      ...user,
      password: passwordHash,
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }
}
