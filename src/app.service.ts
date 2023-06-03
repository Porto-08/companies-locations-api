import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  healthCheck() {
    const healthCheck = {
      uptime: `${process.uptime().toFixed(0)}s`,
      message: "API is running! Don't worry, be happy!",
      date: new Date().toLocaleString(),
    };

    return healthCheck;
  }
}
