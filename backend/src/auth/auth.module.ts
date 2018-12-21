import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { EmailValidatorService } from '../validation/email/email-validator.service';
import { PasswordValidatorService } from '../validation/password/passwrod-validator.service';
import { PasswordCryptographerService } from './password-cryptographer/password-cryptographer';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'testSecret',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy, UserService, EmailValidatorService, PasswordValidatorService, PasswordCryptographerService],
  controllers: [AuthController],
})
export class AuthModule {}
