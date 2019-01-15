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

import {ApiCurrencyService} from './currency.service';
import {Transaction} from '../../transaction/transaction.entity';
import {Currency} from '../../currency/currency.entity';

@ApiUseTags('Api-Currency')
@Controller('api')
export class ApiCurrencyController {
    constructor(private readonly currencyService: ApiCurrencyService) {}

    @ApiBearerAuth()
    @ApiOperation({title: 'Find currencies.'})
    @ApiResponse({
        status: 200,
        description: 'Currencies successfully find.',
        type: Currency,
    })
    @UseGuards(AuthGuard())
    @Get('currencies')
    async getCurrencies() {
        return await this.currencyService.getCurrencies();
    }
}
