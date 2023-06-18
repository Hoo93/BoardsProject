import { IsString, Matches, MaxLength, MinLength } from "@nestjs/class-validator";
import { isString } from "util";

export class CreateUserDto {

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    @Matches(/^[a-zA-Z0-9]/,{
        message: 'username must be composed with English and Number'
    })
    username: string;

    @IsString()
    @Matches(/^[a-zA-Z0-9*!@#$]/,{
        message: 'password must be composed with English and Number'
    })
    password: string;

    @IsString()
    @MinLength(2)
    @MaxLength(10)
    nickname: string;

}
