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

async createUser(userDto: UserDto) : Promise<{accessToken: string, email: string, username: string}>{
    const {email, username, password} = userDto;

    const salt = await bcrypt.genSalt();
    const hashedPasword = await bcrypt.hash(password, salt);

    let user = await this.userRepository.create({
        email,
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
    return this.singIn(userDto.username, userDto.password);
    }

async singIn(username: string, password: string) : Promise<{accessToken: string, email:string, username: string}>{

    const foundUser =  await this.userRepository.findOne({where: {username: username}});
    if(foundUser && (await bcrypt.compare(password, foundUser.password)))
    {
        const email = foundUser.email;
        const payload: JwtPayload = {username};
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken, email, username};
    }
    else
    {
        this.logger.error(`${username} try to sign in.Wrong credentials.`);
        throw new UnauthorizedException('Please check your login credentials!');
    }
}

async getAllUsers() : Promise<UserDto[]> {
    try {
      return this.userRepository.find({});
    } catch (error) {
      this.logger.error(`Cannot get all users`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  async deleteUser(username: string) : Promise<void> {
    try {
        const foundUser =  await this.userRepository.findOne({where: {username: username}});
        let id = foundUser.id;
        this.userRepository.delete({id});
    } catch (error) {
      this.logger.error(`Cannot delete user`, error.stack)
      throw new InternalServerErrorException();
    }
  }
}
