import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { CategoriesModule } from './categories/categories.module';
import { BoardsLikesModule } from './boards_likes/boards_likes.module';
import { CommentsLikeModule } from './comments_like/comments_like.module';
import { CommentsModule } from './comments/comments.module';
import { NoticesModule } from './notices/notices.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        UsersModule,
        BoardsModule,
        CategoriesModule,
        BoardsLikesModule,
        CommentsLikeModule,
        CommentsModule,
        NoticesModule,
    ]
})
export class AppModule {}
