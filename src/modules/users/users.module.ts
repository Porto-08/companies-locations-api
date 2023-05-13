import { Module } from '@nestjs/common';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/typeorm/entities/User';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './infra/http/controllers/user.controller';
import { UpdateUserService } from './services/update-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UsersRepository, CreateUserService, UpdateUserService],
})
export class UserModule {}
