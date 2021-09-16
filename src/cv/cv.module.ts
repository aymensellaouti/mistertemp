import { Module } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvController } from './cv.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cv } from './entities/cv.entity';
import { CvListener } from './listeners/cv.listener';

@Module({
  controllers: [CvController],
  providers: [CvService, CvListener],
  imports: [TypeOrmModule.forFeature([Cv])],
})
export class CvModule {}
