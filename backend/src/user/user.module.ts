import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { EmailValidatorService } from 'src/validation/email/email-validator.service';
import { PasswordValidatorService } from 'src/validation/password/passwrod-validator.service';
import { PasswordCryptographerService } from 'src/auth/password-cryptographer/password-cryptographer';

@Module({
  imports: [TypeOrmModule.forFeature([User]), PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [UserService, EmailValidatorService, PasswordValidatorService, PasswordCryptographerService],
  controllers: [UserController],
})
export class UserModule {}
