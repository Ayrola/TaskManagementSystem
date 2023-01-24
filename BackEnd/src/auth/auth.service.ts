import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository, TreeRepository } from 'typeorm';
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

async createUser(userDto: UserDto) : Promise<{email : string, username: string, isActive: boolean}>{
    const {email, username, password} = userDto;

    const salt = await bcrypt.genSalt();
    const hashedPasword = await bcrypt.hash(password, salt);

    let user = await this.userRepository.create({
        email,
        username,
        password: hashedPasword,
    });
    this.sendMailWhenSignIn(user);
    await this.userRepository.save(user).catch(e =>{
        if(e.code = '23505')
        {
            console.log("here" + e);
            this.logger.error(`${user.username} try creation of a user: Data: ${JSON.stringify(user)}`, e);
            throw new ConflictException('User already in use');
        }
        else{
            this.logger.error(e);
            throw new InternalServerErrorException();
        }
    });
    return { email, username, isActive: false };
    }

async singIn(username: string, password: string) : Promise<{accessToken: string, email:string, username: string, isActive: boolean}>{

    const foundUser =  await this.userRepository.findOne({where: {username: username}});
    if(foundUser && (await bcrypt.compare(password, foundUser.password)))
    {
      if(foundUser.active ==true)
      {
        const email = foundUser.email;
        const isActive = true;
        const payload: JwtPayload = {username};
        const accessToken: string = await this.jwtService.sign(payload);
        return { accessToken, email, username, isActive };
      }
      else
      {
        this.logger.error(`${username} try to sign in.Account not varified`);
        throw new UnauthorizedException('Please verify your account!');
    }
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

  async activateUser(username: string) : Promise<void> {
    try {
        const foundUser =  await this.userRepository.findOne({where: {username: username}});
        console.log(foundUser)
        foundUser.active = true;
        this.userRepository.save(foundUser);
    } catch (error) {
      this.logger.error(`User was not activated successfully`, error.stack)
      throw new InternalServerErrorException();
    }
  }

  async sendMailWhenSignIn(user: User)
  {
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      secure: false,
      auth: {
        user: 'testingnodemailer99@gmail.com',
        pass: 'ilmvhfwobwxbtmyq'
      }
    });

    try{
      let info = await transporter.sendMail({
        from: 'testingnodemailer99@gmail.com',
        to: user.email,
        subject: 'test',
        html: `<h1>Email Confirmation</h1>
        <h2>Hello ${user.username}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:4200/userVerification/${user.username}> Click here</a>
        </div>`,
      });

      console.log(info.messageId);
      console.log('testing mail');
    }catch(err)
    {
      console.log(err);
    }

  }
}
