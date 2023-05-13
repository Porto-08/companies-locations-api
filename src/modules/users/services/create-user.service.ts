import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async execute(user: CreateUserDTO) {
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
