import {Injectable, Inject, HttpService} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';

import { Transaction } from './transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
import { Customer } from '../customer/customer.entity';

@Injectable()
export class TransactionService {
    private readonly axios = axios;
    private readonly apiKeyEth = 'RMH5QFETBID9BXHSDXYG7I4AHN692URJWX';
    private readonly apiKeyBtc = 'c73d-c0bb-3311-36cf';

    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
                @InjectRepository(Wallet) private readonly walletRepositroy: Repository<Wallet>,
                @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
                private readonly httpService: HttpService,
    ) {
    }

    private async grabEth(apiKey: string, wallet: string) {
        let transactions;

        await this.httpService.get('http://api.etherscan.io/api?module=account&action=txlist&address=' + wallet + '&sort=asc&apikey=' + apiKey)
            .subscribe(res => {
                transactions = res.data.result;
            });

        return transactions;
    }

    private async getNumberTransactionsBtc(wallet: string): Promise<number> {
        let count: number;

        await this.httpService.get('https://chain.so/api/v2/address/BTC/' + wallet)
            .subscribe(res => {
                count = res.data.data.total_txs;
            });

        return count;
    }

    private async grabBtc(apiKey: string, wallet: string, lastetTx: string): Promise<any> {
        let transactions;

        await this.httpService.get('https://block.io/api/v2/get_transactions/?api_key='
            + apiKey + '&type=received&addresses=' + wallet + '&before_tx=' + lastetTx)
            .subscribe(res => {
                transactions = res.data.data.txs;
            });

        return transactions;
    }

    async storeBtcTx(): Promise<boolean> {
        const wallets = await this.walletRepositroy.createQueryBuilder('wallet')
            .where('wallet.currency = :currency', {currency: 'BTC'})
            .leftJoinAndSelect('wallet.customer', 'customer')
            .getMany();

        wallets.map(async wallet => {
            const count = await this.getNumberTransactionsBtc(wallet.wallet);
            const iterator = Math.ceil(count / 25);
            let newTx = '';
            let lastetTx = '';

            for (let i = 0; i < iterator; i++) {
                const transactions = await this.grabBtc(this.apiKeyBtc, wallet.wallet, lastetTx);
                transactions.map(async transaction => {
                    const isTransaction = await this.transactionRepository.findOne({txId: transaction.txid});
                    if (newTx !== transaction.txid && !isTransaction) {
                        const newTransaction = await this.transactionRepository.create({
                            txId: transaction.txid,
                            currency: wallet.currency,
                            from: transaction.senders[0],
                            amount: transaction.amounts_received[0].amount,
                            date: new Date(Number(transaction.time) * 1000).toUTCString(),
                            status: transaction.confidence === 1 ? 'true' : 'false',
                            customer: wallet.customer,
                        });
                        const savedTransaction = await this.transactionRepository.save(newTransaction);
                    }
                    newTx = transaction.txid;
                    lastetTx = transactions[transactions.length - 1].txid;
                });
            }
        });

        return true;
    }

    async storeEthTx(): Promise<boolean> {
        const wallets = await this.walletRepositroy.createQueryBuilder('wallet')
            .where('wallet.currency = :currency', {currency: 'ETH'})
            .leftJoinAndSelect('wallet.customer', 'customer')
            .getMany();

        wallets.map(async wallet => {
            const transactions = await this.grabEth(this.apiKeyEth, wallet.wallet);
            transactions.map(async transaction => {
                const isTransaction = await this.transactionRepository.findOne({txId: transaction.hash});
                if (!isTransaction) {
                    const newTransaction = await this.transactionRepository.create({
                        txId: transaction.hash,
                        currency: wallet.currency,
                        from: transaction.from,
                        amount: transaction.value / 1000000000000000000,
                        date: new Date(Number(transaction.timeStamp) * 1000).toUTCString(),
                        status: transaction.isError === 1 ? 'false' : 'true',
                        customer: wallet.customer,
                    });

                    const savedTransaction = await this.transactionRepository.save(newTransaction);
                }
            });
        });

        return true;
    }

    async find(findOptions?: FindManyOptions<Transaction>): Promise<Transaction[]> {
        return await this.transactionRepository.find({
            relations: ['customer'],
            ...findOptions,
        });
    }

    async findCount(): Promise<number> {
        const transactions = await this.transactionRepository.find();

        return transactions.length;
    }

    async create(request: DeepPartial<Transaction>): Promise<Transaction> {
        const findCustomer = await this.customerRepository.find(request.customer);
        const transaction = await this.transactionRepository.create(request);
        const merge = Object.assign(transaction, {findCustomer});

        const savedTransaction = await this.transactionRepository.save(merge);

        return savedTransaction;
    }

    async findOne(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne(id, {relations: ['customer']});
    }

    async update(id: number, request: DeepPartial<Transaction>): Promise<boolean> {
        const findCustomer =  await this.customerRepository.findOne(request.customer);
        const merge = Object.assign(request, {findCustomer});
        const updatedTransaction = await this.transactionRepository.update(id, merge);

        return true;
    }

    async delete(id: number): Promise<boolean> {
        const transaction = await this.transactionRepository.findOne(id);

        if (!transaction) {
            return false;
        }

        await this.transactionRepository.delete(id);

        return true;
    }
}
