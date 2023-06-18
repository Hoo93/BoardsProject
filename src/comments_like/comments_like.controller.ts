import { Controller } from '@nestjs/common';
import { CommentsLikeService } from './comments_like.service';

@Controller('comments-like')
export class CommentsLikeController {
    constructor(private readonly commentsLikeService: CommentsLikeService) {}
}
