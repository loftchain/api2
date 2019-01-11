import { Injectable, LoggerService } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule, defaults } from 'nest-schedule';
import { CurrencyService } from '../currency/currency.service';

defaults.enable = true;
defaults.maxRetry = 100;
defaults.retryInterval = 5000;
defaults.logger = false;

@Injectable()
export class CurrencyScheduleService extends NestSchedule {
  constructor(private readonly currencySerivce: CurrencyService) {
    super();
  }

  @Cron('0 0 * * *')
  async grabCurrencies() {
      await this.currencySerivce.grab();
  }
}
