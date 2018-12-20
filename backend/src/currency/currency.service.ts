import {Injectable, HttpService} from '@nestjs/common';
import {Repository} from 'typeorm';
import axios from 'axios';
import {DeepPartial} from 'typeorm/common/DeepPartial';

import {Currency} from './currency.entity';
import {CurrencyDto} from './currency.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CurrencyService {
    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>,
                private readonly httpService: HttpService,
    ) {}

    async grab(): Promise<object> {
        const pairs: string[] = [
            'BTC/USD',
            'ETH/USD',
            'BTC/ETH',
        ];

        await pairs.map((i, k) => {
            this.httpService.request({
                method: 'get',
                url: 'https://rest.coinapi.io/v1/exchangerate/' + i,
                headers: {'X-CoinAPI-Key': 'FD93956C-E7F6-4564-A60B-A320FE7BE2F3'},
            }).subscribe(res => {
                const {data} = res;

                const currency = this.currencyRepository.create({
                    pair: data.asset_id_base + '/' + data.asset_id_quote,
                    price: data.rate,
                    timestamp: data.time,
                });

                const savedCurrency = this.currencyRepository.save(currency);
            });
        });

        return {
            status: true,
        };
    }

    async find(): Promise<Currency[]> {
        return this.currencyRepository.find();
    }

    async findById(id: number): Promise<Currency> {
        return await this.currencyRepository.findOne(id);
    }

    async create(currencyDto: CurrencyDto): Promise<Currency> {
        const currency = this.currencyRepository.create(currencyDto);

        const savedCurrency = await this.currencyRepository.save(currency);

        return savedCurrency;
    }

    async update(id: number, request: CurrencyDto): Promise<Currency> {
        const currency = await this.currencyRepository.findOne(id);

        currency.pair = request.pair;
        currency.price = request.price;
        currency.timestamp = request.timestamp;

        const updatedCurrency = await this.currencyRepository.save(currency);

        return updatedCurrency;
    }

    async delete(id: number): Promise<object> {
        const currency = await this.currencyRepository.findOne(id);

        if (!currency) {
            return {
                status: false,
            };
        }

        await this.currencyRepository.delete(id);

        return {
            status: true,
        };
    }
}
