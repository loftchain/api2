import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Wallet } from 'src/wallet/wallet.entity';
import { Customer } from 'src/customer/customer.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet, Customer]), PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule],
    controllers: [TransactionController],
    providers: [TransactionService],
})
export class TransactionModule {
}
