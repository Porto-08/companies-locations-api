import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

@Injectable()
export class DeleteUserService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(id: number): Promise<void> {
    try {
      await this.usersRepository.delete(id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(
        error.message || 'Internal server error.',
        error.status || 500,
      );
    }
  }
}
