import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { User } from 'src/users/entity/user.entity';
import { getCurrentDateTime } from 'src/getCurrentDateTime';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Category } from 'src/categories/entity/category.entity';

@Injectable()
export class BoardsService {
    constructor(
        @Inject('BOARD_REPOSITORY')
        private boardsRepository:Repository<Board>,
        @Inject('CATEGORY_REPOSITORY')
        private catetoriesRepository:Repository<Category>
    ) {}

    async createBoard(user:User,createBoardDto:CreateBoardDto) {
        const { categoryId, title, content } = createBoardDto;
        const category = await this.catetoriesRepository.findOneBy({id:categoryId});
        if (!category) {
            throw new NotFoundException('category does not exist')
        }
        const board = await this.boardsRepository.create({
            user:user,
            categoryId:categoryId,
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
        // TO DO 수정 내용 없으면 에러 던지기
        if (!updateBoardDto) {
            throw new BadRequestException();
        }
        
        const board = await this.getBoardById(id);
        if (!board) {
            throw new NotFoundException();
        }
        
        if (board.userId !== user.id) {
            throw new UnauthorizedException();
        }
        
        const updateResult = await this.boardsRepository.update(
            id,
            {
                ...updateBoardDto,
                updated_at:getCurrentDateTime()
            });
            
        if (updateResult.affected === 0){
            throw new InternalServerErrorException();
        }
        return updateResult
        
    }

   
    async deleteBoard(user:User,id:number):Promise<DeleteResult> {
        const board = await this.getBoardById(id);
        
        if (board.user.id !== user.id) {
            throw new UnauthorizedException();
        }

        const result = await this.boardsRepository.delete(board);

        if (result.affected === 0){
            throw new InternalServerErrorException();
        }
        return result

    }


}
