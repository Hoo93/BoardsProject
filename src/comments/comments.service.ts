import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Comment } from './entity/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { User } from 'src/users/entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { AuthGuard } from '@nestjs/passport';
import { throwIfEmpty } from 'rxjs';

@Injectable()
export class CommentsService {
    constructor(
        @Inject('COMMENT_REPOSITORY')
        private readonly commentsRepository:Repository<Comment>
    ) {}

    async createComment(user:User,createCommentDto:CreateCommentDto):Promise<Comment> {
        const { boardId, content} = createCommentDto;

        try {
            const comment = await this.commentsRepository.create({
                userId:user.id,
                boardId,
                content,
                created_at:getCurrentDateTime(),
                updated_at:getCurrentDateTime()
            })

            await this.commentsRepository.save(comment);
            return comment
        } catch(error) {
            throw new BadRequestException(error)
        }

    }

    async getAllCommentsByUserId(id:number):Promise<Comment[]> {
        const comments = await this.commentsRepository.find({where:{id}})
        
        if (comments.length === 0) {
            throw new NotFoundException()
        }
        return comments
    }

    async getCommentById(id:number):Promise<Comment> {
        const comment = await this.commentsRepository.findOneBy({id});
        if (!comment) {
            throw new NotFoundException()
        }
        return comment
    }

    async getAllCommentsByBoardId(boardId:number):Promise<Comment[]> {
        const comments = await this.commentsRepository.find({where:{boardId}});
        if (comments.length === 0) {
            throw new NotFoundException()
        }

        return comments
    }

    async updateComment(user:User,id:number,updateCommentDto:UpdateCommentDto):Promise<UpdateResult> {
        const comment = await this.getCommentById(id);
        if (comment.userId !== user.id) {
            throw new UnauthorizedException()
        }

        try {
            const updateResult = await this.commentsRepository.update(id,{...updateCommentDto,updated_at:getCurrentDateTime()})
            if (updateResult.affected === 0 ){
                throw new NotFoundException()
            }
            return updateResult
        } catch {
            throw new BadRequestException()
        }

    }

    async deleteComment(user:User,id:number):Promise<DeleteResult> {
        const comment = await this.getCommentById(id);
        if (comment.userId !== user.id) {
            throw new UnauthorizedException()
        }

        try {
            const deleteResult = await this.commentsRepository.delete(id);
            if (deleteResult.affected === 0) {
                throw new NotFoundException()
            }
            return deleteResult
        } catch {
            throw new BadRequestException()
        }
    }

}
