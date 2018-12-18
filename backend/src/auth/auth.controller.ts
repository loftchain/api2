import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Body() requestBody) {
        return await this.authService.signIn(requestBody);
    }

    @Get('test')
    @UseGuards(AuthGuard())
    async test() {
        return 'test auth';
    }
}
