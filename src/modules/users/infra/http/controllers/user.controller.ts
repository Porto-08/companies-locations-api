import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dtos/create-user.dto';
import { UpdateUserDTO } from 'src/modules/users/dtos/update-user.dto';
import { CreateUserService } from 'src/modules/users/services/create-user.service';
import { UpdateUserService } from 'src/modules/users/services/update-user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService,

    @Inject(UpdateUserService)
    private readonly updateUserService: UpdateUserService,
  ) {}

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
}
