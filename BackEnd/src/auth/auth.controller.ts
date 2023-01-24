import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from './Dtos/database.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Get('/getAllUsers')
    async getAllusers() : Promise<UserDto[]>
    {
        return await this.authService.getAllUsers();
    }

    @Delete('/:id')
    async deleteUser(@Param('id') username: string) : Promise<void>
    {
        await this.authService.deleteUser(username);
    }

    @Post('/signUp')
    async signUp(@Body()userDto: UserDto) : Promise<{email: string, username: string, isActive: boolean}>{
        return await this.authService.createUser(userDto);
    }

    @Post('/signIn')
    async signIn(@Body('username')username: string, @Body('password')password: string,) : Promise<{accessToken: string}>{
        await this.delay(1000);
        return await this.authService.singIn(username, password);
    }

    @Post('/activateUser')
    async activateUser(@Body('username')username: string){
        await this.delay(1000);
        await this.authService.activateUser(username);
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
