import { Module } from '@nestjs/common';
import { LoginService } from './services/login.service';
import { UserModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infra/http/controllers/auth.controller';
import { jwtConstants } from './config/constants';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [LoginService],
  controllers: [AuthController],
  exports: [LoginService],
})
export class AuthModule {}
