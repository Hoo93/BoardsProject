import { Controller } from '@nestjs/common';
import { BoardsLikesService } from './boards_likes.service';

@Controller('boards-likes')
export class BoardsLikesController {
  constructor(private readonly boardsLikesService: BoardsLikesService) {}
}
