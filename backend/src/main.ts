import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.use(ConfigModule).get(ConfigService);

  app.use(cors([config.get('FRONT_URL')]));

  await app.listen(3000);
}
bootstrap();
