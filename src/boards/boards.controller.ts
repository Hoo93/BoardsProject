import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardsService } from './boards.service';
import { UpdateBoardDto } from './dto/update-board.dto';

@Controller('boards')
@UseGuards(AuthGuard('jwt'))
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Post()
    createBoard(@Req() req:any, @Body(ValidationPipe) createBoardDto:CreateBoardDto){
        return this.boardsService.createBoard(req.user,createBoardDto);
    }

    @Get()
    getAllboards() {
        return this.boardsService.getAllboards();
    }

    @Get('/title/:title')
    getBoardByTitle(@Param('title') title:string) {
        return this.boardsService.getBoardByTitle(title);
    }

    @Get('/id/:id')
    getBoardById(@Param('id') id:number) {
        return this.boardsService.getBoardById(id);
    }

    @Patch('/:id')
    updateBoard(@Req() req:any ,@Param('id') id:number, @Body(ValidationPipe) updateBoardDto:UpdateBoardDto) {
        return this.boardsService.updateBoard(req.user,id,updateBoardDto);
    }

    @Delete('/:id')
    deleteBoard(@Req() req:any, @Param('id') id:number) {
        return this.boardsService.deleteBoard(req.user,id);
    }
}
