import { Controller, Get, Post, Body, UseGuards, BadRequestException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { EmailValidatorService } from 'src/validation/email/email-validator.service';
import { PasswordValidatorService } from 'src/validation/password/passwrod-validator.service';
import { UserDto } from './user.dto';
import { apiPath } from 'src/api';

@Controller(apiPath(1, 'users'))
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly emailValidatorService: EmailValidatorService,
                private readonly passwordValidatorService: PasswordValidatorService,
        ) {}

    @Post()
    async create(@Body('user') requestBody: UserDto) {
        console.log(requestBody);

        const emailValidator = await this.emailValidatorService.validateEmail(requestBody.email);
        if (!emailValidator.isValid) {
            throw new BadRequestException('Invalid email!');
        }

        const passwordValidator = await this.passwordValidatorService.validatePassword(requestBody.password);
        if (!passwordValidator.isValid) {
            throw new BadRequestException('Invalid password!');
        }

        try {
            return await this.userService.create(requestBody);
          } catch (err) {
            if (err.message === 'User already exists') {
              throw new ForbiddenException(err.message);
            } else {
              throw new InternalServerErrorException(err.message);
            }
          }
    }

    @Get('test')
    @UseGuards(AuthGuard())
    async test() {
        return 'test';
    }
}
