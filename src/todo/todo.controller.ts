import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Header,
} from '@nestjs/common';
import { Request } from 'express';
import { v4 as uuid4 } from 'uuid';
/* import { of } from 'rxjs'; */
import { TodoModel } from './model/todo.model';

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [];
  constructor() {
    this.todos = [
      new TodoModel(uuid4(), 'first todo', 'mon Premier todo'),
      new TodoModel(uuid4(), 'second todo', 'mon Second todo'),
    ];
  }

  @Get('add')
  getTodos(@Req() request: Request): TodoModel[] {
    console.log('My request', request);
    /* of(1, 2, 3); */
    return this.todos;
  }
  @Post()
  @HttpCode(205)
  addTodo(@Body() partialTodo: Partial<TodoModel>): TodoModel[] {
    const { name, description } = partialTodo;
    const newTodo = new TodoModel(uuid4(), name, description);
    /*     if (//le nom existe) {
        throw new BadRequestException('');
    } */
    this.todos.push(newTodo);
    return this.todos;
  }
}
