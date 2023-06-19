import { Module } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { boardProviders } from './boards.provider';
import { DatabaseModule } from 'src/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';

@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([Board])
    ],
    controllers: [BoardsController],
    providers: [
        BoardsService,
        ...boardProviders,
    ],
})
export class BoardsModule {}
