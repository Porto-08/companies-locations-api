import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/users/dtos/create-user.dto';
import { CreateUserService } from 'src/modules/users/services/create-user.service';

@Controller('users')
export class UserController {
  constructor(
    @Inject(CreateUserService)
    private readonly createUserService: CreateUserService,
  ) {}

  @Post('create')
  async create(@Body() user: CreateUserDTO) {
    const createdUser = await this.createUserService.execute(user);

    return createdUser;
  }
}
