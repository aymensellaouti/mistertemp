import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PayloadDto } from './dto/payload.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  subscribe(subscribeDto: SubscribeDto) {
    return this.userService.create(subscribeDto);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.userService.findUserByUsernameOrEmail(username);
    if (user) {
      const isUser = await bcrypt.compare(password, user.password);
      if (isUser) {
        const payload: PayloadDto = {
          username: user.username,
          email: user.email,
          role: user.role,
        };
        const jwt = this.jwtService.sign(payload);
        return { jwt };
      }
    }
    throw new NotFoundException('Bad credentials');
  }
}
