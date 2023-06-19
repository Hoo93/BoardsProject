import { Module } from '@nestjs/common';
import { CommentsLikeService } from './comments_like.service';
import { CommentsLikeController } from './comments_like.controller';
import { DatabaseModule } from 'src/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentLike } from './entity/comment_like.entity';

@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([CommentLike])
    ],
    controllers: [CommentsLikeController],
    providers: [CommentsLikeService]
})
export class CommentsLikeModule {}
