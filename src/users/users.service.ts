import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository:Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async createUser(createUserDto:CreateUserDto):Promise<User> {
        const { username, password, nickname } = createUserDto;
        const user = this.userRepository.create({
            username,
            password,
            nickname,
            created_at:getCurrentDateTime(),
            updated_at:getCurrentDateTime()
        })

        try {
            await this.userRepository.save(user);
            console.log(user)
            return user
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
