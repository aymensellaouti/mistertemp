import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { UpperAndFusionPipe } from "../pipes/upper-and-fusion.pipe";
import { FirstService } from "./first.service";

@Controller('first')
export class FirstController {
  constructor(
    private firstService: FirstService
  ) {}
  // binder /first/premier
  @Get('premier/:name?')
  getFirstMessage(
    @Param(
      'name',
      new DefaultValuePipe(0),
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    name: number,
  ): string {
    this.firstService.sayHello();
    return 'first';
  }
  @Post()
  postFirst(@Body(UpperAndFusionPipe) data) {
    // Todo : Appliquer le pipe
    return data;
  }
  @Put()
  putFirst() {
    console.log(':rabbit put');
    return ':turttle put';
  }
  @Patch()
  patchFirst() {
    console.log(':rabbit patch');
    return ':turttle patch';
  }
  @Delete()
  deleteFirst() {
    console.log(':rabbit delete');
    return ':turttle delete';
  }
}
