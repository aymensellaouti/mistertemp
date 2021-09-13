import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('first')
export class FirstController {
  // binder /first/premier
  @Get('premier/:name?')
  getFirstMessage(@Param('name') name = 'unknown'): string {
    return `Cc Mr ${name} in first controller`;
  }
  @Post()
  postFirst(@Body() data) {
    console.log('data :', data);
    console.log(`:rabbit post`);
    return ':rabbit post';
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
