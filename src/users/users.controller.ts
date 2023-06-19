import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/signin')
    signIn(@Body() authCredentialDto:AuthCredentialDto):Promise<object> {
        return this.usersService.signIn(authCredentialDto);
    }

    @Post('/signup')
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:number,@Body() updateUserDto:UpdateUserDto) {
        return this.usersService.updateUser(id,updateUserDto);
    }

    @Get()
    getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getUser(@Param('id') id:number) {
        return this.usersService.getUser(id);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id:number) {
        return this.usersService.deleteUser(id);
    }
    




}
