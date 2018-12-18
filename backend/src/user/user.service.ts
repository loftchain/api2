import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PayloadInterface } from 'src/auth/payload.interface';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User> ) {}

    async create(requestBody) {
        const user = await this.userRepository.create({
            name: requestBody.name,
            email: requestBody.email,
            password: requestBody.password,
        });

        const savedUsers = await this.userRepository.save(user);

        return savedUsers;
    }

    async checkByPayload(payload: PayloadInterface): Promise<User> {
        return await this.userRepository.findOne(payload);
    }
}
