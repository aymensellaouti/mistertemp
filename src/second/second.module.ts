import { Module } from '@nestjs/common';
import { ThirdModule } from './third/third.module';
import { SecondController } from './second.controller';
import { HttpModule } from '@nestjs/axios';
import { SecondService } from './second.service';
import { FirstModule } from "../first/first.module";

@Module({
  imports: [FirstModule, HttpModule],
  controllers: [SecondController],
  providers: [SecondService],
})
export class SecondModule {}
