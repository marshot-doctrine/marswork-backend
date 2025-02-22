import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule } from '@nestjs/swagger';

// import * as expressBasicAuth from 'express-basic-auth';

import { AppModule } from './app.module';
import { API_URL } from './constants';
import { swaggerConfig } from './configs';

class Application {
  private logger = new Logger(Application.name);
  private HOST: string;
  private PORT: string;

  constructor(private app: NestExpressApplication) {
    this.app = app;
    this.HOST = process.env.HOST;
    this.PORT = process.env.PORT;
  }

  private async setUpOpenAPI() {
    // this.app.use(
    //   [API_URL.SWAGGER.DOCS, API_URL.SWAGGER.DOCS_JSON],
    //   expressBasicAuth({
    //     challenge: true,
    //     users: {
    //       [process.env.ADMIN_USER]: process.env.ADMIN_PASSWORD,
    //     },
    //   }),
    // );

    const document = SwaggerModule.createDocument(this.app, swaggerConfig);

    SwaggerModule.setup(API_URL.SWAGGER.DOCS, this.app, document);
  }

  private async setUpGlobalMiddleware() {
    this.setUpOpenAPI();
  }

  async bootstrap() {
    await this.setUpGlobalMiddleware();

    await this.app.listen(this.PORT);
  }

  startLog() {
    this.logger.log(`✅ 서버가 ${this.HOST}:${this.PORT} 에서 실행 중입니다🚀`);
  }
}

async function init() {
  const server = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  const app = new Application(server);

  await app.bootstrap();

  app.startLog();
}

init();
