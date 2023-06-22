import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentsLikeService } from './comments_like.service';
import { AuthGuard } from '@nestjs/passport';
import { log } from 'console';

@Controller('comments-like')
@UseGuards(AuthGuard('jwt'))
export class CommentsLikeController {
    constructor(private readonly commentsLikeService: CommentsLikeService) {}

    @Get()
    helloWorld(@Req() req:any) {
        log(req.user)
        return req.user
    }

    @Post('/:commentId')
    createCommentLike(@Req() req:any,@Param('commentId') commentId:number) {
        console.log(1)
        return this.commentsLikeService.createCommentLike(req.user,commentId)
    }

    @Delete('/:commentId')
    deleteCommetLike(@Req() req:any,@Param('commentId') commentId:number) {
        return this.commentsLikeService.deleteCommentLike(req.user,commentId)
    }
}
