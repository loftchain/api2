import {HttpModule, Module} from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import {TransactionService} from '../transaction/transaction.service';
import {Transaction} from '../transaction/transaction.entity';
import {Wallet} from '../wallet/wallet.entity';
import {Customer} from '../customer/customer.entity';
import {ConfigModule} from '../config/config.module';
import {CurrencyService} from '../currency/currency.service';
import {Currency} from '../currency/currency.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Wallet, Customer, Currency]), PassportModule.register({ defaultStrategy: 'jwt' }), HttpModule,
        ConfigModule],
    providers: [WebsocketGateway, TransactionService, CurrencyService],
})
export class WebsocketModule {}
