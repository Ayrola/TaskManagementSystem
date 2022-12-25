import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from './Dtos/database.user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signUp')
    async signUp(@Body()userDto: UserDto) : Promise<void>{
        await this.authService.createUser(userDto);
    }

    @Post('/signIn')
    async signIn(@Body()userDto: UserDto) : Promise<{accessToken: string}>{
        return await this.authService.singIn(userDto);
    }
}
