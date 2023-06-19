import { MaxLength, MinLength } from "@nestjs/class-validator";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBoardDto {

    @IsInt()
    @IsNotEmpty()
    categoryId:number;
    
    @IsString()
    @MaxLength(20)
    @MinLength(2)
    @IsNotEmpty()
    title:string;

    @IsString()
    @MaxLength(10000)
    @MinLength(1)
    @IsNotEmpty()
    content:string;


}