import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDto } from './Dtos/database.user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload-interface';
import { Logger } from '@nestjs/common'
import { json } from 'stream/consumers';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService');
    constructor(
        @Inject('AUTH_REPOSITORY')
        private userRepository: Repository<User>,
        private jwtService: JwtService,
      ) {}

async createUser(userDto: UserDto) : Promise<void>{
    const {username, password} = userDto;

    const salt = await bcrypt.genSalt();
    const hashedPasword = await bcrypt.hash(password, salt);

    let user = await this.userRepository.create({
        username,
        password: hashedPasword,
    });
    
    await this.userRepository.save(user).catch(e =>{
        if(e.code = '23505')
        {
            this.logger.error(`${user.username} try creation of a user: Data: ${JSON.stringify(user)}`, e);
            throw new ConflictException('User already in use');
        }
        else{
            this.logger.error(e);
            throw new InternalServerErrorException();
        }
    });
    }

async singIn(userDto: UserDto) : Promise<{accessToken: string, username: string}>{
    const { username, password } = userDto;

    const foundUser =  await this.userRepository.findOne({where: {username: username}});
    if(foundUser && (await bcrypt.compare(password, foundUser.password)))
    {
        const payload: JwtPayload = {username};
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken, username };
    }
    else
    {
        this.logger.error(`${username} try to sign in.Wrong credentials.`);
        throw new UnauthorizedException('Please check your login credentials!');
    }
}
}
