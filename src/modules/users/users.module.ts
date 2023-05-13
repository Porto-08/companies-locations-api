import { Module } from '@nestjs/common';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';

@Module({
  imports: [],
  controllers: [],
  providers: [UsersRepository],
})
export class UserModule {}
