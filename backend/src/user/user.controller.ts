import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { async } from 'rxjs/internal/scheduler/async';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() requsetBody) {
        const user = await this.userService.create(requsetBody);

        return user;
    }

    @Get('test')
    @UseGuards(AuthGuard())
    async test() {
        return 'test';
    }
}
