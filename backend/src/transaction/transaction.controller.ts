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

import { Transaction } from './transaction.entity';
import { apiPath } from '../api';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';
import { TransactionService } from './transaction.service';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { FindManyOptions } from 'typeorm';

@ApiUseTags('Transactions')
@Controller(apiPath(1, 'transactions'))
export class TransactionController {
    constructor(private readonly transactionService: TransactionService) {}

    @ApiBearerAuth()
    @ApiOperation({title: 'Grab ETH transactions.'})
    @ApiResponse({
        status: 200,
        description: 'Success grab.',
    })
     @UseGuards(AuthGuard())
    @Get('grab/eth')
    async grabEth(): Promise<boolean> {
        return this.transactionService.storeEthTx();
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Grab BTC transactions.'})
    @ApiResponse({
        status: 200,
        description: 'Success grab.',
    })
    @UseGuards(AuthGuard())
    @Get('grab/btc')
    async grabBtc() {
        return this.transactionService.storeBtcTx();
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Get transactions.'})
    @ApiResponse({
        status: 200,
        description: 'transactions successfully received.',
        type: Transaction,
    })
    @UseGuards(AuthGuard())
    @Get()
    async find(@Query() findOptions): Promise<[Transaction[], number]> {
        return this.transactionService.find(findOptions);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find transaction by id.'})
    @ApiResponse({
        status: 200,
        description: 'Transaction successfully find.',
        type: Transaction,
    })
    @UseGuards(AuthGuard())
    @Get(':id')
    async findOne(@Param('id', new ParseIntPipe()) id: number): Promise<Transaction> {
        return this.transactionService.findOne(id);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Create transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully created.',
    })
    @UseGuards(AuthGuard())
    @Post()
    async create(@Body() requsetBody: DeepPartial<Transaction>): Promise<Transaction> {
        return this.transactionService.create(requsetBody);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Update transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully updated.',
        type: Boolean,
    })
    @UseGuards(AuthGuard())
    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() requsetBody: DeepPartial<Transaction>): Promise<boolean> {
        return this.transactionService.update(id, requsetBody);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Delete transaction.'})
    @ApiResponse({
        status: 201,
        description: 'Transaction successfully deleted.',
        type: Boolean,
    })
    @UseGuards(AuthGuard())
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<boolean> {
        return this.transactionService.delete(id);
    }
}
