import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";


export class CreateCommentDto {
    
    @IsInt()
    @IsNotEmpty()
    boardId:number;
    
    @IsString()
    @IsNotEmpty()
    content:string;
    
}