import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../../users/infra/typeorm/repositories/UsersRepository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginService {
  constructor(
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,

    @Inject(JwtService)
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    try {
      const user = await this.usersRepository.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid credentials.');
      }

      const token = this.jwtService.sign({ id: user.id });

      return {
        user: {
          ...user,
          password: undefined,
        },
        token,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
