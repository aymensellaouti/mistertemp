import { Injectable } from '@nestjs/common';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Skill } from '../skill/entities/skill.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Cv } from './entities/cv.entity';
import { CrudService } from '../generics/crud.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class CvService extends CrudService<Cv> {
  constructor(
    @InjectRepository(Cv)
    private cvRepository: Repository<Cv>,
    private eventEmitter: EventEmitter2,
  ) {
    super(cvRepository);
  }
  async create(addDto): Promise<Cv> {
    const cv = await super.create(addDto);
    if (cv) {
      this.eventEmitter.emit('added-cv', { data: cv });
    }
    return cv;
  }
}
