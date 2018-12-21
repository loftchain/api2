import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { PayloadInterface } from 'src/auth/payload.interface';
import { UserDto } from './user.dto';
import { PasswordCryptographerService } from '../auth/password-cryptographer/password-cryptographer';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
                private readonly passwordCryptographerService: PasswordCryptographerService,
    ) {}

    async create(userDto: UserDto): Promise<User> {
        const existingUser = await this.userRepository.findOne({email: userDto.email});
        if (existingUser) {
            throw new Error('User already exists');
        }

        const hash = await this.passwordCryptographerService.doHash(userDto.password);
        const user = await this.userRepository.create({
            name: userDto.name,
            email: userDto.email,
            password: hash,
        });

        const savedUsers = await this.userRepository.save(user);

        return savedUsers;
    }

    async checkByPayload(idPayLoad: number): Promise<User> {
        return await this.userRepository.findOne({id: idPayLoad});
    }

    async findByEmail(email: string) {
        return await this.userRepository.findOne({email});
    }
}
