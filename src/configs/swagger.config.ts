import { APP } from '@/constants';
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('MarsWork - API')
  .setDescription('MarsWork Open API Specification')
  .setVersion(APP.VERSION)
  .build();
