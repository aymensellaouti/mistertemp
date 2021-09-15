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
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { TodoModel } from './model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';
import { TodoEntity } from './entities/todo.entity';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { SearchTodoDto } from './dto/search-todo.dto';

@Controller({
  path: 'todo',
  version: '2',
})
export class TodoDbController {
  todos: TodoModel[] = [];
  constructor(private todoService: TodoService) {}
  @Get('')
  getTodos(@Query() searchTodoDto: SearchTodoDto): Promise<TodoModel[]> {
    return this.todoService.findAll(searchTodoDto, {});
  }

  @Post()
  addTodo(@Body() addTodoDto: AddTodoDto): Promise<TodoModel> {
    return this.todoService.addDbTodo(addTodoDto);
  }

  @Get(':id')
  finTodoById(@Param('id') id: string): Promise<TodoModel> {
    return this.todoService.finTodoDbById(id);
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return this.todoService.softDeleteDbTodo(id);
  }
  @Patch('/restore/:id')
  restoreTodo(@Param('id') id: string): Promise<UpdateResult> {
    return this.todoService.restoreDbTodo(id);
  }

  @Put(':id')
  updateTodo(
    @Param('id') id: string,
    @Body() partialTodo: UpdateTodoDto,
  ): Promise<TodoEntity> {
    return this.todoService.updateDbTodo(id, partialTodo);
  }
}
