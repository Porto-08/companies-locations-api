import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateLoginDTO } from '../../../dtos/create-login.dto';
import { LoginService } from '../../../services/login.service';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,
  ) {}

  @Post('login')
  async login(@Body() credentials: CreateLoginDTO) {
    const { email, password } = credentials;

    const { user, token } = await this.loginService.signIn(email, password);

    return {
      user,
      token,
    };
  }
}
