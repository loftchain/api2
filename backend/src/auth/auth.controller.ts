import { Controller, Body, Post, Get, UseGuards, BadRequestException, Request } from '@nestjs/common';
import {classToPlain} from 'class-transformer';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from './auth.dto';
import { UserService } from '../user/user.service';
import { EmailValidatorService } from '../validation/email/email-validator.service';
import { PasswordValidatorService } from '../validation/password/passwrod-validator.service';
import { PasswordCryptographerService } from './password-cryptographer/password-cryptographer';
import { apiPath } from '../api';

@ApiUseTags('Users')
@Controller(apiPath(1, 'auth'))
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly userService: UserService,
                private readonly emailValidatorService: EmailValidatorService,
                private readonly passwordValidatorService: PasswordValidatorService,
                private readonly passwordCryptographerService: PasswordCryptographerService,
         ) {}

    @ApiOperation({title: 'Authorize'})
    @ApiResponse({
           status: 200,
           description: 'Credentials are ok, returning JWT.',
    })
    @ApiResponse({status: 400, description: 'The email or password is incorrect!'})
    @Post()
    async login(@Body() req: AuthDto) {
        const emailValidator = await this.emailValidatorService.validateEmail(req.email);
        if (!emailValidator.isValid) {
            throw new BadRequestException('Invalid email!');
        }

        const passwordValidator = await this.passwordValidatorService.validatePassword(req.password);
        if (!passwordValidator.isValid) {
            throw new BadRequestException('Invalid password!');
        }

        const user = await this.userService.findByEmail(req.email);
        if (!user || !await this.passwordCryptographerService.doCompare(req.password, user.password)) {
            throw new BadRequestException('Incorrect email or password!');
        }
        const token = await this.authService.signIn({id: user.id});

        return {
            user,
            token,
        };
    }
}
