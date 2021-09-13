import { Inject, Injectable } from "@nestjs/common";
import { LoggerService } from "./logger.service";

@Injectable()
export class FirstService {
  constructor(
    private loggerService: LoggerService,
    @Inject('PI') private pi
    ) {}
  sayHello() {
    this.loggerService.logger('Hello ' + this.pi);
  }
}
