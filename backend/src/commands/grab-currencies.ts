import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../app.module';
import { CurrencyModule } from '../currency/currency.module';
import { CurrencyService } from '../currency/currency.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const currencies = app.select(CurrencyModule).get(CurrencyService);
  const grabCurrencies = currencies.grab();
}
bootstrap();
