import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Customer } from './customer.entity';
import { Wallet } from '../wallet/wallet.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
   imports: [TypeOrmModule.forFeature([Customer, Wallet]), PassportModule.register({ defaultStrategy: 'jwt' })],
   providers: [CustomerService],
   controllers: [CustomerController],
})
export class CustomerModule {}
