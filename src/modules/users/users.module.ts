import { Module } from '@nestjs/common';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/typeorm/entities/User';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './infra/http/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersRepository, CreateUserService],
})
export class UserModule {}
