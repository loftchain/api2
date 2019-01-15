import {Injectable, Inject, HttpService} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { InjectRepository } from '@nestjs/typeorm';

import { Transaction } from './transaction.entity';
import { Wallet } from '../wallet/wallet.entity';
import { Customer } from '../customer/customer.entity';
import { ConfigService } from '../config/config.service';

@Injectable()
export class TransactionService {
    constructor(@InjectRepository(Transaction) private readonly transactionRepository: Repository<Transaction>,
                @InjectRepository(Wallet) private readonly walletRepositroy: Repository<Wallet>,
                @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
                private readonly httpService: HttpService,
                private readonly config: ConfigService,
    ) {
    }

    private grabEth(wallet: string) {
        return this.httpService.get('http://api.etherscan.io/api?module=account&action=txlist&address=' + wallet + '&sort=asc&apikey='
            + this.config.get('API_KEY_ETH'));
                // transactions = res.data.result;
    }

    private getNumberTransactionsBtc(wallet: string) {
        return this.httpService.get('https://chain.so/api/v2/address/BTC/' + wallet);
                // count = res.data.data.total_txs;
    }

    private grabBtc(wallet: string, lastetTx: string) {
        return this.httpService.get('https://block.io/api/v2/get_transactions/?api_key='
            + this.config.get('API_KEY_BTC') + '&type=received&addresses=' + wallet + '&before_tx=' + lastetTx);
                // transactions = res.data.data.txs;

    }

    async storeBtcTx(): Promise<boolean> {
        const wallets = await this.walletRepositroy.createQueryBuilder('wallet')
            .where('wallet.currency = :currency', {currency: 'BTC'})
            .leftJoinAndSelect('wallet.customer', 'customer')
            .getMany();

        wallets.map(async wallet => {
            this.getNumberTransactionsBtc(wallet.wallet).subscribe(res => {
                const count = res.data.data.total_txs;
                const iterator = Math.ceil(count / 25);
                let newTx = '';
                let lastetTx = '';

                for (let i = 0; i < iterator; i++) {
                    this.grabBtc(wallet.wallet, lastetTx)
                        .subscribe(result => {
                            const transactions = result.data.data.txs;
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
                                    await this.transactionRepository.save(newTransaction);
                                }
                                newTx = transaction.txid;
                                lastetTx = transactions[transactions.length - 1].txid;
                            });
                        }, error => console.log(error.response.data));
                }
            }, error => console.log(error.response.data));
        });

        return true;
    }

    async storeEthTx(): Promise<boolean> {
        const wallets = await this.walletRepositroy.createQueryBuilder('wallet')
            .where('wallet.currency = :currency', {currency: 'ETH'})
            .leftJoinAndSelect('wallet.customer', 'customer')
            .getMany();

        wallets.map(async wallet => {
            this.grabEth(wallet.wallet).subscribe(res => {
                const transactions = res.data.result;
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
                        await this.transactionRepository.save(newTransaction);
                    }
                });
            }, error => console.log(error.response.data));
        });

        return true;
    }

    async find(findOptions?): Promise<Transaction[]> {
        const wherePayload = {};

        if (findOptions.currency) {
            wherePayload['currency'] = findOptions.currency;
        }

        if (findOptions.status) {
            wherePayload['status'] = findOptions.status;
        }

        return await this.transactionRepository.find({
            relations: ['customer'],
            take: findOptions.take,
            skip: findOptions.skip,
            where: wherePayload,
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

        return await this.transactionRepository.save(merge);
    }

    async findOne(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne(id, {relations: ['customer']});
    }

    async update(id: number, request: DeepPartial<Transaction>): Promise<boolean> {
        const findCustomer =  await this.customerRepository.findOne(request.customer);
        const merge = Object.assign(request, {findCustomer});
        await this.transactionRepository.update(id, merge);

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
