import { IsInt } from "@nestjs/class-validator";


export class CreateCommentLikeDto {

    @IsInt()
    commentId:number;

}
