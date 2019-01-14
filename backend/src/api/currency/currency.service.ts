import {Injectable, Inject, HttpService, HttpException} from '@nestjs/common';
import {FindManyOptions, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import {Currency} from '../../currency/currency.entity';

@Injectable()
export class ApiCurrencyService {
    constructor(@InjectRepository(Currency) private readonly currencyRepository: Repository<Currency>) {}

    public async getCurrencies() {
        return await this.currencyRepository.find({
            order: {
                id: 'DESC',
            },
        });
    }
}
