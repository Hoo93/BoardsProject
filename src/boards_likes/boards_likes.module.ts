import { Module } from '@nestjs/common';
import { BoardsLikesService } from './boards_likes.service';
import { BoardsLikesController } from './boards_likes.controller';
import { boardLikeProviders } from './boards_likes.providers';
import { DatabaseModule } from 'src/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardLike } from './entity/board_like.entity';


@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([BoardLike])
    ],
    controllers: [BoardsLikesController],
    providers: [
        BoardsLikesService,
        ...boardLikeProviders
    ],

})
export class BoardsLikesModule {}
