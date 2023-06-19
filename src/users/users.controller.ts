import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Request() req:any) {
        console.log(req.user)
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto:AuthCredentialDto):Promise<object> {
        return this.usersService.signIn(authCredentialDto);
    }

    @Post('/signup')
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch()
    @UseGuards(AuthGuard())
    updateUser(@Request() req:any,@Body() updateUserDto:UpdateUserDto) {
        return this.usersService.updateUser(req.user,updateUserDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get()
    getUser(@Param('id') id:number) {
        return this.usersService.getUser(id);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard())
    deleteUser(@Request() req:any) {
        return this.usersService.deleteUser(req.user);
    }
    




}
