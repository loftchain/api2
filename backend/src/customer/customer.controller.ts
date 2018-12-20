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

import {Customer} from './customer.entity';
import {apiPath} from '../api';
import {ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth} from '@nestjs/swagger';
import {CustomerService} from './customer.service';
import {CustomerDto} from './customer.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiUseTags('Customers')
@Controller(apiPath(1, 'customers'))
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @ApiBearerAuth()
    @ApiOperation({title: 'Find customers'})
    @ApiResponse({
        status: 201,
        description: 'Customers successfully received.',
        type: Customer,
    })
    @UseGuards(AuthGuard())
    @Get()
    async findCustomers(): Promise<Customer[]> {
        return this.customerService.find();
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Find one customer by id'})
    @ApiResponse({
        status: 200,
        description: 'Customer successfully received.',
        type: Customer,
    })
    @UseGuards(AuthGuard())
    @Get(':id')
    async findCustomerById(@Param('id', new ParseIntPipe()) id: number) {
        return this.customerService.findById(id);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Create customers'})
    @ApiResponse({
        status: 200,
        description: 'Customer successfully created.',
        type: Customer,
    })
    @UseGuards(AuthGuard())
    @Post()
    async createCustomers(@Body() requestBody: CustomerDto) {
        return this.customerService.create(requestBody);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Delete customers'})
    @ApiResponse({
        status: 200,
        description: 'Customer successfully deleted.',
        type: Customer,
    })
    @UseGuards(AuthGuard())
    @Delete(':id')
    async deleteCustomers(@Param('id', new ParseIntPipe()) id: number): Promise<object> {
        return this.customerService.delete(id);
    }

    @ApiBearerAuth()
    @ApiOperation({title: 'Update customers'})
    @ApiResponse({
        status: 200,
        description: 'Customer successfully updated.',
        type: Customer,
    })
    @UseGuards(AuthGuard())
    @Put(':id')
    async updateCustomers(@Param('id', new ParseIntPipe()) id: number, @Body() requestBody: CustomerDto): Promise<Customer> {
        return this.customerService.update(id, requestBody);
    }
}
