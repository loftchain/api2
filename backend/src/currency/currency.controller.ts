import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';

import {Currency} from './currency.entity';
import {apiPath} from '../api';
import {ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth} from '@nestjs/swagger';
import {CurrencyService} from './currency.service';
import {CurrencyDto} from './currency.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Currencies')
@Controller(apiPath(1, 'currencies'))
export class CurrencyController {
    constructor(private readonly currencyService: CurrencyService) {}

    @ApiBearerAuth()
    @ApiOperation({title: 'Grab currencies.'})
    @ApiResponse({
        status: 200,
        description: 'Currency success grab',
        type: {},
    })
    @UseGuards(AuthGuard())
    @Get('grab')
    async grab(): Promise<object> {
        return this.currencyService.grab();
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find currency.'})
    @ApiResponse({
    status: 200,
    description: 'Currency successfully received.',
    type: Currency,
    })
    @UseGuards(AuthGuard())
    @Get()
    async find(): Promise<Currency[]> {
        return this.currencyService.find();
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find currencies.'})
    @ApiResponse({
        status: 200,
        description: 'Currency successfully received.',
        type: Currency,
    })
    @UseGuards(AuthGuard())
    @Get(':id')
    async findByid(@Param('id', new ParseIntPipe()) id: number): Promise<Currency> {
        return this.currencyService.findById(id);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Create currencies.'})
    @ApiResponse({
        status: 200,
        description: 'Currency successfully created.',
        type: Currency,
    })
    @UseGuards(AuthGuard())
    @Post()
    async create(@Body() requestBody: CurrencyDto): Promise<Currency> {
        return this.currencyService.create(requestBody);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Update currency.'})
    @ApiResponse({
        status: 200,
        description: 'Currency successfully updated.',
        type: Currency,
    })
    @UseGuards(AuthGuard())
    @Put(':id')
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() requestBody: CurrencyDto): Promise<Currency> {
        return this.currencyService.update(id, requestBody);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Update currency.'})
    @ApiResponse({
        status: 200,
        description: 'Currency successfully updated.',
        type: {},
    })
    @UseGuards(AuthGuard())
    @Delete(':id')
    async delete(@Param('id', new ParseIntPipe()) id: number): Promise<object> {
        return this.currencyService.delete(id);
    }

}
