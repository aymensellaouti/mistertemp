import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';

@Module({
  controllers: [JobController],
  providers: [JobService],
  imports: [TypeOrmModule.forFeature([Job])],
})
export class JobModule {}
