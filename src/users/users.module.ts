import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/config/database.module';
import { userProviders } from './users.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
    imports:[
        DatabaseModule,
        // TypeOrmModule.forFeature([User])
    ],
    controllers: [UsersController],
    providers: [
        ...userProviders,
        UsersService,
    ]
    
})

export class UsersModule {}
