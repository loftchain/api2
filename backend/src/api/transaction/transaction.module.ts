import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ApiTransactionController } from './transaction.controller';
import { ApiTransactionService } from './transaction.service';
import { Transaction } from '../../transaction/transaction.entity';
import {Customer} from '../../customer/customer.entity';
import {Wallet} from '../../wallet/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Customer, Wallet]), PassportModule.register({ defaultStrategy: 'jwt' })],
    controllers: [ApiTransactionController],
    providers: [ApiTransactionService],
})
export class ApiTransactionModule {
}
