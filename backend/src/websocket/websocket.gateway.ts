import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse,
} from '@nestjs/websockets';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TransactionService} from '../transaction/transaction.service';
import {Transaction} from '../transaction/transaction.entity';
import {CurrencyService} from '../currency/currency.service';

@WebSocketGateway(8080)
export class WebsocketGateway {
    @WebSocketServer() server;

    constructor(private readonly transactionService: TransactionService,
                private readonly currencyService: CurrencyService,
    ) {
    }

    @SubscribeMessage('mitoshi')
    async onEvent(client, data): Promise<{ eth: number, ethUsd: number, btc: number, btcUsd: number }> {
        const tx = await this.transactionService.find({name: data});
        const sumAmount = {
            eth: 0,
            ethUsd: 0,
            btc: 0,
            btcUsd: 0,
        };
        const ethUsd = await this.currencyService.findByPair('ETH/USD');
        const btcUsd = await this.currencyService.findByPair('BTC/USD');
        tx[0].forEach(i => {
            if (i.currency === 'ETH') {
                sumAmount.eth += i.amount;
                sumAmount.ethUsd += i.amount * Number(ethUsd.price);
            } else {
                sumAmount.btc += i.amount;
                sumAmount.btcUsd += i.amount * Number(btcUsd.price);
            }
        });

        return sumAmount;
    }
}
