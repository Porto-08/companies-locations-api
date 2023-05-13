import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedException('Token not provided.');
    }

    const [, token] = authorization.split(' ');

    if (!token) {
      throw new UnauthorizedException('Token not provided.');
    }

    try {
      const payload = this.jwtService.verify(token);

      req.user = payload;

      return next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token.');
    }
  }
}
