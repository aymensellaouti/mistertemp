import { Module } from '@nestjs/common';
import { ThirdModule } from './third/third.module';
import { SecondController } from './second.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ThirdModule, HttpModule],
  controllers: [SecondController],
})
export class SecondModule {}
