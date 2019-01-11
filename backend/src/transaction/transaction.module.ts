import { Module, HttpModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { Transaction } from './transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
import { Customer } from '../customer/customer.entity';
import { TransactionScheduleService } from './transaction-schedule.service';
import { ConfigModule } from '../config/config.module';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet, Customer]), PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule,
    ConfigModule],
    controllers: [TransactionController],
    providers: [TransactionService, TransactionScheduleService],
})
export class TransactionModule {
}
