import { Module } from '@nestjs/common';
import { UsersRepository } from './infra/typeorm/repositories/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infra/typeorm/entities/User';
import { CreateUserService } from './services/create-user.service';
import { UserController } from './infra/http/controllers/user.controller';
import { UpdateUserService } from './services/update-user.service';
import { DeleteUserService } from './services/delete-user.service';
import { ListUsersService } from './services/list-user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UsersRepository,
    CreateUserService,
    UpdateUserService,
    DeleteUserService,
    ListUsersService,
  ],
  exports: [UsersRepository],
})
export class UserModule {}
