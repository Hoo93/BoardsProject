import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "./users.service";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor (
        @Inject('USER_REPOSITORY')
        private userRepository:Repository<User>) {
        super({
            secretOrKey:'jwt secret text',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload:any) {
        const { username, id } = payload;
        const user = await this.userRepository.findOneBy({username});
        
        if (!user) {
            throw new UnauthorizedException('user does not exist')
        }
        console.log('jwt validate is working')

        return user;

    }

     


}