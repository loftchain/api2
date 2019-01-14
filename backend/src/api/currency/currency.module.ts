import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {Currency} from '../../currency/currency.entity';
import {ApiCurrencyController} from './currency.controller';
import {ApiCurrencyService} from './currency.service';

@Module({
    imports: [TypeOrmModule.forFeature([Currency]), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [ApiCurrencyController],
    providers: [ApiCurrencyService],
})
export class ApiCurrencyModule {
}
