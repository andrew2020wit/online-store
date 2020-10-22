import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  // app.setGlobalPrefix('api');
  await app.listen(PORT);

  console.log(`OnlineStore is running on: ${await app.getUrl()}`);
}
bootstrap();
