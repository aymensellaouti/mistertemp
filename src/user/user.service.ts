import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { CrudService } from '../generics/crud.service';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { SubscribeDto } from '../auth/dto/subscribe.dto';
@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super(userRepository);
  }
  async create(addDto: SubscribeDto): Promise<User> {
    const user = this.userRepository.create(addDto);
    const salt = await bcrypt.genSalt();
    user.salt = salt;
    const pwd = await bcrypt.hash(user.password, salt);
    user.password = pwd;
    const newUser = await super.create(user);
    return newUser;
  }
  findUserByUsernameOrEmail(userCredntial: string): Promise<User> {
    return this.userRepository.findOne({
      where: [{ username: userCredntial }, { email: userCredntial }],
    });
  }
}
