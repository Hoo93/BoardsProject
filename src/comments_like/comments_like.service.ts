import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentLike } from './entity/comment_like.entity';

@Injectable()
export class CommentsLikeService {
    constructor(
        @Inject('COMMENTS_LIKES_REPOSITORY')
        private commentLikesRepository:Repository<CommentLike>
    ) {}

    


}
