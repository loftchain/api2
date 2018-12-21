import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';

import { Transaction } from './transaction.entity';
import { apiPath } from '../api';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { DeepPartial } from 'typeorm/common/DeepPartial';

@ApiUseTags('Transaction')
@Controller(apiPath(1, 'transaction'))
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @ApiOperation({title: 'Grab ETH transactions.'})
    @ApiResponse({
        status: 200,
        description: 'Success grab.',
    })
    @Get('grab/eth')
    async grabEth(): Promise<boolean> {
        return this.transactionService.storeEthTx();
    }

    @ApiOperation({title: 'Grab BTC transactions.'})
    @ApiResponse({
        status: 200,
        description: 'Success grab.',
    })
    @Get('grab/btc')
    async grabBtc() {
        return this.transactionService.storeBtcTx();
    }

    @ApiOperation({title: 'Get transactions.'})
    @ApiResponse({
        status: 200,
        description: 'transactions successfully received.',
        type: Transaction,
    })
    @Get()
    async find(): Promise<Transaction[]> {
        return this.transactionService.find();
    }

    @ApiOperation({title: 'Find transaction by id.'})
    @ApiResponse({
        status: 200,
        description: 'Transaction successfully find.',
        type: Transaction,
    })
    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }

    @ApiOperation({title: 'Create transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully created.',
    })
    @Post()
    async create(@Body() requsetBody: DeepPartial<Transaction>): Promise<Transaction> {
        return this.transactionService.create(requsetBody);
    }

    @ApiOperation({title: 'Update transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully updated.',
        type: Boolean,
    })
    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() requsetBody: DeepPartial<Transaction>): Promise<boolean> {
        return this.transactionService.update(id, requsetBody);
    }

    @ApiOperation({title: 'Delete transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully deleted.',
        type: Boolean,
    })
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
        return this.transactionService.delete(id);
    }
}
