import { Module } from '@nestjs/common';
import { CommentsLikeService } from './comments_like.service';
import { CommentsLikeController } from './comments_like.controller';

@Module({
    controllers: [CommentsLikeController],
    providers: [CommentsLikeService]
})
export class CommentsLikeModule {}
