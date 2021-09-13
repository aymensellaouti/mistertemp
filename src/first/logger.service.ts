import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerService {
  logger(message: string): void {
    console.log('i am logging', message);
  }
}
