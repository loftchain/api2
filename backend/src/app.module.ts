import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Connection } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { CurrencyModule } from './currency/currency.module';
import { TransactionModule } from './transaction/transaction.module';
import {ApiTransactionModule} from './api/transaction/transaction.module';
import {ApiCurrencyModule} from './api/currency/currency.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule, UserModule, AuthModule, CustomerModule, CurrencyModule, TransactionModule,
      ApiTransactionModule, ApiCurrencyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}
