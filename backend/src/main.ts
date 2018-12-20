import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';

import { AppModule } from './app.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new ConfigService('.env');

  app.use(cors([
    config.get('FRONT_URL'),
  ]));

  const options = new DocumentBuilder()
    .setTitle('api2')
    .setDescription('api2 loftchain')
    .setVersion('1.0')
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api/loftchain', app, document);

  await app.listen(3000);
}
bootstrap();
