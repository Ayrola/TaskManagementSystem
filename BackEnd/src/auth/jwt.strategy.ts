import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport"
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { JwtPayload } from "./jwt-payload-interface";
import { User } from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @Inject('AUTH_REPOSITORY')
        private usersRepository: Repository<User>
    ){
        super({
            secretOrKey: 'topSecret51',
            JwtStrategy: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate(payload: JwtPayload): Promise<User>{
        const {username} = payload;
        const user: User = await this.usersRepository.findOne({where: {username: username}});

        if(!user)
        {
            throw new UnauthorizedException();
        }

        return user;
    }
}