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
    async signUp(@Body()userDto: UserDto) : Promise<{accessToken: string, username: string}>{
        return await this.authService.createUser(userDto);
    }

    @Post('/signIn')
    async signIn(@Body()userDto: UserDto) : Promise<{accessToken: string}>{
        await this.delay(1000);
        return await this.authService.singIn(userDto);
    }

    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
}
