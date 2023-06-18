import { Module } from '@nestjs/common';
import { BoardsLikesService } from './boards_likes.service';
import { BoardsLikesController } from './boards_likes.controller';

@Module({
    controllers: [BoardsLikesController],
    providers: [BoardsLikesService]
})
export class BoardsLikesModule {}
