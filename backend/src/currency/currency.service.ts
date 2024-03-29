import {Injectable, HttpService} from '@nestjs/common';
import {FindConditions, Repository} from 'typeorm';

import { Currency } from './currency.entity';
import { CurrencyDto } from './currency.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CurrencyService {
    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>,
                private readonly httpService: HttpService,
                private readonly config: ConfigService,
    ) {
    }

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
                headers: {'X-CoinAPI-Key': this.config.get('API_CURRENCY_KEY')},
            }).subscribe(res => {
                const {data} = res;

                const currency = this.currencyRepository.create({
                    pair: data.asset_id_base + '/' + data.asset_id_quote,
                    price: data.rate,
                    timestamp: data.time,
                });

                const savedCurrency = this.currencyRepository.save(currency);
            }, error => console.log(error.response.data));
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

    async findByPair(currency: string): Promise<Currency> {
        return await this.currencyRepository.findOne({
            where: {pair: currency},
            order: {id: 'DESC'},
        });
    }
}
