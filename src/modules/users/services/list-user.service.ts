import { Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export class ListUsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute() {
    const users = await this.usersRepository.list();

    return users;
  }
}
