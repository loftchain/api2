import { Injectable } from '@nestjs/common';
import { FindManyOptions, Repository, getRepository } from 'typeorm';
import { DeepPartial } from 'typeorm/common/DeepPartial';

import { Customer } from './customer.entity';
import { Wallet } from '../wallet/wallet.entity';
import { CustomerDto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CustomerService {
    constructor(@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
                @InjectRepository(Wallet) private readonly walletRepository: Repository<Wallet>,
    ) {
    }

    async find(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }

    async findById(id: number) {
        return await this.customerRepository.findOne({id});
    }

    async create(customerDto: CustomerDto) {
        const customer = await this.customerRepository.create({
            name: customerDto.name,
        });

        const savedCustomer = await this.customerRepository.save(customer);

        const walletEth = this.walletRepository.create({
            currency: customerDto.currencyEth,
            wallet: customerDto.walletEth,
            customer: savedCustomer,
        });
        const savedWalletEth = await this.walletRepository.save(walletEth);

        const walletBtc = await this.walletRepository.create({
            currency: customerDto.currencyBtc,
            wallet: customerDto.walletBtc,
            customer: savedCustomer,
        });
        const savedWalletBtc = await this.walletRepository.save(walletBtc);

        const newCustomer = this.customerRepository.findOne({id: savedCustomer.id});

        return newCustomer;
    }

    async delete(customerId: number): Promise<object> {
        const customer = await this.customerRepository.findOne({id: customerId});

        if (!customer) {
            return {
                status: false,
            };
        }

        await this.customerRepository.delete(customerId);
        return {
            status: true,
        };
    }

    async update(customerId: number, request: CustomerDto): Promise<Customer> {
        const customer = await this.customerRepository.findOne({id: customerId});
        customer.name = request.name;
        const savedCustomer = await this.customerRepository.save(customer);

        savedCustomer.wallet.map((wallet, key) => {
            if (wallet.currency === 'ETH') {
               this.walletRepository.update(wallet.id, {
                   currency: request.currencyEth,
                   wallet: request.walletEth,
               });
            } else {
                this.walletRepository.update(wallet.id, {
                    currency: request.currencyBtc,
                    wallet: request.walletBtc,
                });
            }
        });

        return await this.findById(customerId);
    }
}
