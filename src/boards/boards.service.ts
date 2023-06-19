import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/users/entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @Inject('BOARD_REPOSITORY')
        private boardsRepository:Repository<Board>
    ) {}

    async createBoard(user:User,createBoardDto:CreateBoardDto) {
        const { category_id, title, content } = createBoardDto;
        const board = await this.boardsRepository.create({
            user_id:user.id,
            category_id,
            title,
            content,
            created_at:getCurrentDateTime(),
            updated_at:getCurrentDateTime()
        })

        try {
            await this.boardsRepository.save(board);
            return board
        } catch(error) {
            throw new InternalServerErrorException(error);
        }

    }

    
    async getAllboards():Promise<Board[]> {
        const boards:Board[] = await this.boardsRepository.find();
        if (!boards) {
            throw new NotFoundException();
        }
        return boards
    }

    
    async getBoardByTitle(title:string):Promise<Board[]> {
        const boards:Board[] = await this.boardsRepository.find({where:{title}});
        if (!boards) {
            throw new NotFoundException();
        }
        return boards
    }

    
    async getBoardById(id:number):Promise<Board> {
        const board = await this.boardsRepository.findOneBy({id});
        if (!board) {
            throw new NotFoundException();
        }
        return board
    }

    
    async updateBoard(user:User,id:number,updateBoardDto:UpdateBoardDto):Promise<UpdateResult> {
        if (!updateBoardDto) {
            throw new BadRequestException();
        }
        console.log(updateBoardDto)
        const board = await this.getBoardById(id);
        if (!board) {
            throw new NotFoundException();
        }
        if (board.user_id !== user.id) {
            throw new UnauthorizedException();
        }
        const result = await this.boardsRepository.update(id,{...updateBoardDto,updated_at:getCurrentDateTime()});

        if (result.affected === 0){
            throw new InternalServerErrorException();
        }
        return result
        
    }

   
    async deleteBoard(user:User,id:number):Promise<DeleteResult> {
        const board = await this.getBoardById(id);
        
        if (board.user_id !== user.id) {
            throw new UnauthorizedException();
        }

        const result = await this.boardsRepository.delete(board);

        if (result.affected === 0){
            throw new InternalServerErrorException();
        }
        return result

    }


}
