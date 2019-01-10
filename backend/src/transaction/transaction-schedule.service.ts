import { Injectable, LoggerService } from '@nestjs/common';
import { Cron, Interval, Timeout, NestSchedule, defaults } from 'nest-schedule';
import { TransactionService } from './transaction.service';
import { async } from 'rxjs/internal/scheduler/async';

defaults.enable = true;
defaults.maxRetry = -1;
defaults.retryInterval = 5000;
defaults.logger = false;

@Injectable()
export class TransactionScheduleService extends NestSchedule {
  constructor(private readonly transactionService: TransactionService) {
    super();
  }

  @Cron('* * * * *')
  async grabEthTx() {
    console.log('start eth grab');
    await this.transactionService.storeEthTx();
  }

  // @Interval(5000)
  // intervalJob() {
  //     console.log('test interval');
  // }

  @Cron('* * * * *')
  async grabBtcTx() {
      console.log('start btc grab');
      await this.transactionService.storeBtcTx();
  }
}
