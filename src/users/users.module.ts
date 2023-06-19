import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from './users.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret:'jwt secret text',
            signOptions:{
                expiresIn:3600
            }
        }),
        PassportModule.register({defaultStrategy:'jwt'})

    ],
    controllers: [UsersController],
    providers: [
        ...userProviders,
        UsersService,
    ]
    
})

export class UsersModule {}
