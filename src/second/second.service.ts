import { Injectable } from '@nestjs/common';
import { FirstModule } from "../first/first.module";
import { FirstService } from "../first/first.service";

@Injectable()
export class SecondService {
  constructor(private firstService: FirstService) {
  }
  // private firstService = new FirstService();
  saySomething() {
    this.firstService.sayHello();
  }
}
