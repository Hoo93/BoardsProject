import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { DatabaseModule } from 'src/config/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entity/comment.entity';

@Module({
    imports:[
        DatabaseModule,
        TypeOrmModule.forFeature([Comment])
    ],
    controllers: [CommentsController],
    providers: [CommentsService]
})
export class CommentsModule {}
