import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CommentLike } from './entity/comment_like.entity';
import { User } from 'src/users/entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';
import { log } from 'console';

@Injectable()
export class CommentsLikeService {
    constructor(
        @Inject('COMMENTS_LIKES_REPOSITORY')
        private commentLikesRepository:Repository<CommentLike>
    ) {}

    async createCommentLike(user:User,commentId:number):Promise<CommentLike> {
        const found = await this.commentLikesRepository.findOneBy({userId:user.id,commentId})
        
        if (found) { 
            throw new BadRequestException('already likes')
        }

        try {
            const commentLike = this.commentLikesRepository.create({
                created_at:getCurrentDateTime(),
                updated_at:getCurrentDateTime(),
                commentId,
                userId:user.id
            });

            await this.commentLikesRepository.save(commentLike);
            return commentLike
        } catch (error) {
            throw new BadRequestException()
        }
    
    }

    async deleteCommentLike(user:User,commentId:number):Promise<DeleteResult> {
        const found = await this.commentLikesRepository.findOneBy({userId:user.id,commentId});

        if (!found) {
            throw new NotFoundException();
        }

        const deleteResult = await this.commentLikesRepository.delete(found);
        if (deleteResult.affected === 0 ){
            throw new NotFoundException();
        }

        return deleteResult;
    }

    


}
