import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from '../../../dtos/create-user.dto';
import { UpdateUserDTO } from '../../../dtos/update-user.dto';
import { CreateUserService } from '../../../services/create-user.service';
import { DeleteUserService } from '../../../services/delete-user.service';
import { ListUsersService } from '../../../services/list-user.service';
import { UpdateUserService } from '../../../services/update-user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService,

    @Inject(UpdateUserService)
    private readonly updateUserService: UpdateUserService,

    @Inject(DeleteUserService)
    private readonly deleteUserService: DeleteUserService,

    @Inject(ListUsersService)
    private readonly listUsersService: ListUsersService,
  ) {}

  @Get()
  async list() {
    const users = await this.listUsersService.execute();

    return users;
  }

  @Post('create')
  async create(@Body() user: CreateUserDTO) {
    const createdUser = await this.createUserService.execute(user);

    return createdUser;
  }

  @Put('update/:id')
  async update(@Param('id') id: number, @Body() user: UpdateUserDTO) {
    if (Object.keys(user).length === 0) {
      throw new BadRequestException('No data to update user.');
    }

    const updatedUser = await this.updateUserService.execute(id, user);

    return updatedUser;
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    const deletedUser = await this.deleteUserService.execute(id);

    return deletedUser;
  }
}
