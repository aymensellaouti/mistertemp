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
  Put, Version
} from "@nestjs/common";
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

  @Get('version')
  @Version('1')
  sayVersion() {
    return 'v1';
  }
  @Get('version')
  @Version('2')
  sayVersion2() {
    return 'v2';
  }
}
