import { Module } from '@nestjs/common';
import { FirstController } from './first.controller';
import { FirstService } from './first.service';
import { LoggerService } from './logger.service';
@Module({
  controllers: [FirstController],
  providers: [
    FirstService,
    LoggerService,
    {
      provide: 'PI',
      useValue: 3.14,
    },
  ],
  exports: [FirstService],
})
export class FirstModule {}
