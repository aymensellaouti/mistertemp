import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  HttpCode,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import { TodoModel } from './model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  todos: TodoModel[] = [];

  constructor(private todoService: TodoService) {}

  @Get('add')
  getTodos(@Req() request: Request): TodoModel[] {
    return this.todoService.getTodos();
  }

  @Post()
  @HttpCode(205)
  addTodo(@Body() partialTodo: AddTodoDto): TodoModel[] {
    return this.todoService.addTodo(partialTodo);
  }

  @Get(':id')
  finTodoById(@Param('id') id: string): TodoModel {
    return this.todoService.finTodoById(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): { count: number } {
    return this.todoService.deleteTodo(id);
  }
  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() partialTodo: Partial<UpdateTodoDto>,
  ): TodoModel {
    return this.todoService.updateTodo(id, partialTodo);
  }
}
