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
    await this.transactionService.storeEthTx();
  }

  @Cron('* * * * *')
  async grabBtcTx() {
      await this.transactionService.storeBtcTx();
  }
}
