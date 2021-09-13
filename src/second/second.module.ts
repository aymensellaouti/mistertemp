import { Module } from '@nestjs/common';
import { ThirdModule } from './third/third.module';

@Module({
  imports: [ThirdModule]
})
export class SecondModule {}
