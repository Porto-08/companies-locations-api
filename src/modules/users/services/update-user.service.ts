import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { ICreatedUser } from '../domain/models/ICreatedUser';
import * as bcrypt from 'bcrypt';
import { UpdateUserDTO } from '../dtos/update-user.dto';
import { User } from '../infra/typeorm/entities/User';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async execute(id: number, user: UpdateUserDTO) {
    try {
      const userExists = await this.usersRepository.findById(id);

      if (!userExists) {
        throw new BadRequestException('User not found.');
      }

      if (user.email) {
        const userAlreadyExists = await this.usersRepository.findByEmail(
          user.email,
        );

        if (userAlreadyExists) {
          throw new BadRequestException('This email is already in use.');
        }

        userExists.email = user.email;
      }

      userExists.name = user.name || userExists.name;

      if (user.password) {
        const passwordHash = await bcrypt.hash(user.password, 8);

        userExists.password = passwordHash;
      }

      const updatedUser = await this.usersRepository.save(userExists);

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}
