import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Header,
  NotFoundException,
  Param,
  Delete,
  Put,
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

  @Get(':id')
  finTodoById(@Param('id') id: string): TodoModel {
    return this.findTodoId(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    const oldTodos = this.todos;
    this.todos = this.todos.filter((todo) => todo.id != id);
    return {
      count: oldTodos.length - this.todos.length,
    };
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() partialTodo: Partial<TodoModel>,
  ): TodoModel {
    const { description, name, status } = partialTodo;
    const todo = this.findTodoId(id);
    todo.name = name ?? todo.name;
    todo.description = description ?? todo.description;
    todo.status = status ?? todo.status;
    return todo;
  }

  findTodoId(id: string): TodoModel {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`le todo d'id ${id} n'existe pas`);
    }
    return todo;
  }
}
