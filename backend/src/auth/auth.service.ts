import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PayloadInterface } from './payload.interface';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async signIn(user): Promise<string> {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: PayloadInterface): Promise<User> {
    return await this.userService.checkByPayload(payload);
  }
}
