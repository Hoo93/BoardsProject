import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/login')
    signIn(@Body() authCredentialDto:AuthCredentialDto) {
        return this.usersService.login(authCredentialDto);
    }

    @Post()
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
