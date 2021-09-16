import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { PayloadDto } from '../dto/payload.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mistertemp',
    });
  }
  async validate(payload: PayloadDto) {
    const user = await this.userService.findUserByUsernameOrEmail(
      payload.username,
    );
    if (!user) {
      throw new UnauthorizedException('Bad credentials');
    }
    return user;
  }
}
