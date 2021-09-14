import { Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "./logger.service";
import {ConfigService} from '@nestjs/config';
@Injectable()
export class FirstService {
  constructor(
    private loggerService: LoggerService,
    @Inject('PI') private pi,
    // private configService: ConfigService
    ) {}
  sayHello() {
    this.loggerService.logger('Hello ' + this.pi );
  }
}
