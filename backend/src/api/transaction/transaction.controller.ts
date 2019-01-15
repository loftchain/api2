import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put, Query, Request, UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { apiPath } from '../../api';
import {ApiTransactionService} from './transaction.service';
import {Transaction} from '../../transaction/transaction.entity';

@ApiUseTags('Api-Transactions')
@Controller('api')
export class ApiTransactionController {
    constructor(private readonly transactionService: ApiTransactionService) {}

    @ApiBearerAuth()
    @ApiOperation({title: 'Find transactions by customer id.'})
    @ApiResponse({
        status: 200,
        description: 'Transaction successfully find.',
        type: Transaction,
    })
    @UseGuards(AuthGuard())
    @Get('tx/:id')
    getByCustomerId(@Param('id', new ParseIntPipe()) id: number) {
        return this.transactionService.getByCustomerId(id);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find transactions by eth wallet.'})
    @ApiResponse({
        status: 200,
        description: 'Transaction successfully find.',
        type: Transaction,
    })
    @UseGuards(AuthGuard())
    @Get('eth/:wallet')
    async getByEthWallet(@Param('wallet') wallet: string): Promise<Transaction[]> {
        return await this.transactionService.getEthByWallet(wallet);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find transactions by btc wallet.'})
    @ApiResponse({
        status: 200,
        description: 'Transaction successfully find.',
        type: Transaction,
    })
    @UseGuards(AuthGuard())
    @Get('btc/:wallet')
     async getByBtcWallet(@Param('wallet') wallet: string): Promise<Transaction[]> {
        return await this.transactionService.getBtcByWallet(wallet);
    }
}
