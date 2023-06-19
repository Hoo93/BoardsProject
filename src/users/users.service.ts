import { Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';
import * as bcrypt from 'bcrypt'
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository:Repository<User>,
        private jwtService:JwtService
    ) {}

    async signIn(authCredentialDto:AuthCredentialDto):Promise<object> {
        const { username, password } = authCredentialDto;
        const user = await this.userRepository.findOneBy({username});
        
        if ( user && (await bcrypt.compare(password,user?.password)) ) {
            // 유저 토큰 생성
            const payload = { username:user.username, sub:user.id }
            const access_token = await this.jwtService.sign(payload);
    
            return { access_token }
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUser(id:number): Promise<User> {
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            throw new NotFoundException(`user with id: ${id} doesn't exist`)
        }
        return user
        
    }

    async createUser(createUserDto:CreateUserDto):Promise<User> {
        const { username, password, nickname } = createUserDto;
        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(password,salt)
        const user = this.userRepository.create({
            username,
            password:hashed_password,
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

    async updateUser(id:number,updateUserDto:UpdateUserDto): Promise<UpdateResult> {
        const user = await this.getUser(id);
        const result = await this.userRepository.update(id,{...updateUserDto,updated_at:getCurrentDateTime()});
        if ( result.affected === 0 ) {
            throw new NotFoundException(`user with id: ${id} doesn't exist`)
        }
        return result        
    }

    async deleteUser(id:number) {
        const user = await this.getUser(id);
        const result = await this.userRepository.delete(id);
        if ( result.affected === 0 ) {
            throw new NotFoundException(`user with id: ${id} doesn't exist`)
        }
        return result        
    }
}
