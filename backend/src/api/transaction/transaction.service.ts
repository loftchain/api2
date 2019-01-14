import {Injectable, Inject, HttpService, HttpException} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from '../../transaction/transaction.entity';
import {Customer} from '../../customer/customer.entity';
import {Wallet} from '../../wallet/wallet.entity';

@Injectable()
export class ApiTransactionService {
    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
                @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
                @InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>,
                ) {}

    public async getByCustomerId(id: number) {
        const customer = await this.customerRepository.findOne(id);
        if (!customer) {
            throw new HttpException('Not found', 404);
        }

        return customer.transaction;
    }

    public async getEthByWallet(request: string): Promise<Transaction[]> {
        const wallet = await this.walletRepository.findOne({where: {currency: 'ETH', wallet: request}, relations: ['customer']});
        if (!wallet) {
            throw new HttpException('Not found', 404);
        }

        return await this.transactionRepository.createQueryBuilder('transaction')
            .where('transaction.currency = :currency', {currency: 'ETH'})
            .andWhere('transaction.customerId = :customer', {customer: wallet.customer.id})
            .getMany();
    }

    public async getBtcByWallet(request: string): Promise<Transaction[]> {
        const wallet = await this.walletRepository.findOne({where: {currency: 'BTC', wallet: request}, relations: ['customer']});
        if (!wallet) {
            throw new HttpException('Not found', 404);
        }

        return await this.transactionRepository.createQueryBuilder('transaction')
            .where('transaction.currency = :currency', {currency: 'BTC'})
            .andWhere('transaction.customerId = :customer', {customer: wallet.customer.id})
            .getMany();
    }
}
