import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

class Application {
  private logger = new Logger(Application.name);
  private HOST: string;
  private PORT: string;

  constructor(private app: INestApplication) {
    this.app = app;
    this.HOST = process.env.HOST;
    this.PORT = process.env.PORT;
  }

  async bootstrap() {
    this.app = await NestFactory.create(AppModule);
    await this.app.listen(this.PORT);
  }

  startLog() {
    this.logger.log(`✅ 서버가 ${this.HOST}:${this.PORT} 에서 실행 중입니다🚀`);
  }
}

async function init() {
  const server = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const app = new Application(server);

  await app.bootstrap();

  app.startLog();
}

init();
