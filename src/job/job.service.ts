import { Injectable, Logger } from '@nestjs/common';
import { CrudService } from '../generics/crud.service';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JobService extends CrudService<Job> {
  constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {
    super(jobRepository);
  }
}
