import { Controller, Get, Post, Body, UseGuards, BadRequestException, ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { EmailValidatorService } from '../validation/email/email-validator.service';
import { PasswordValidatorService } from '../validation/password/passwrod-validator.service';
import { UserDto } from './user.dto';
import { apiPath } from '../api';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './user.entity';
import {CurrentUser} from "./user.decorator";

@ApiUseTags('Users')
@Controller(apiPath(1, 'users'))
export class UserController {
    constructor(private readonly userService: UserService,
                private readonly emailValidatorService: EmailValidatorService,
                private readonly passwordValidatorService: PasswordValidatorService,
        ) {}

    @ApiOperation({title: 'Register new account'})
    @ApiResponse({
        status: 200,
        description: 'Credentials are ok, returning new user data.',
        type: User,
      })
    @ApiResponse({status: 400, description: 'Email or password are not valid!'})
    @Post()
    async create(@Body('user') requestBody: UserDto) {
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

    @ApiOperation({title: 'Get auth user'})
    @ApiResponse({
        status: 200,
        description: 'Get current auth user',
        type: User,
    })
    @UseGuards(AuthGuard())
    @Get('current')
    async current(@CurrentUser() currentUser) {
        return currentUser;
    }
}
