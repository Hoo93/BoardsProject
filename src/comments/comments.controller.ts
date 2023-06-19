import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    createComment(@Req() req:any,@Body(ValidationPipe) createCommentDto:CreateCommentDto) {
        return this.commentsService.createComment(req.user, createCommentDto);
    }

    @Get('/userId/:id')
    getAllCommentsByUserId(@Param('id') id:number) {
        return this.commentsService.getAllCommentsByUserId(id);
    }

    @Get('/boardId/:id')
    getAllCommentsByBoardId(@Param('id') id:number) {
        return this.commentsService.getAllCommentsByBoardId(id);
    }

    @Get('/:id')
    getCommentById(@Param('id') id:number) {
        return this.commentsService.getCommentById(id);
    }


    @Patch('/:id')
    updateComment(@Req() req:any, @Param('id') id:number, @Body(ValidationPipe) updateCommentDto:UpdateCommentDto) {
        return this.commentsService.updateComment(req.user, id, updateCommentDto);
    }

    @Delete('/:id')
    deleteComment(@Req() req:any, @Param('id') id:number) {
        return this.commentsService.deleteComment(req.user,id);
    }

}
