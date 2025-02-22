import { APP } from '@/constants';
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('AAA - API')
  .setDescription('AAA Open API Specification')
  .setVersion(APP.VERSION)
  .build();
