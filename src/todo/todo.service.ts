import { Injectable, NotFoundException } from '@nestjs/common';
import { TodoModel } from './model/todo.model';
import { AddTodoDto } from './dto/add-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { v4 as uuid4 } from 'uuid';
import { Like, Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { SearchTodoDto } from './dto/search-todo.dto';

@Injectable()
export class TodoService {
  todos: TodoModel[] = [];

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {
    this.todos = [
      new TodoModel(uuid4(), 'first todo', 'mon Premier todo'),
      new TodoModel(uuid4(), 'second todo', 'mon Second todo'),
    ];
  }

  getTodos(): TodoModel[] {
    return this.todos;
  }

  addTodo(partialTodo: AddTodoDto): TodoModel[] {
    const { name, description } = partialTodo;
    const newTodo = new TodoModel(uuid4(), name, description);
    /*     if (//le nom existe) {
        throw new BadRequestException('');
    } */
    this.todos.push(newTodo);
    return this.todos;
  }

  finTodoById(id: string): TodoModel {
    return this.findTodoId(id);
  }

  deleteTodo(id: string): { count: number } {
    const oldTodos = this.todos;
    this.todos = this.todos.filter((todo) => todo.id != id);
    return {
      count: oldTodos.length - this.todos.length,
    };
  }
  updateTodo(id: string, partialTodo: Partial<UpdateTodoDto>): TodoModel {
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

  addDbTodo(addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return this.todoRepository.save(addTodoDto);
  }

  async updateDbTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    const todo = await this.todoRepository.preload({ id, ...updateTodoDto });
    if (!todo) {
      throw new NotFoundException();
    }
    return this.todoRepository.save(todo);
    // return this.todoRepository.update(id, updateTodoDto);
  }
  async deleteDbTodo(id): Promise<DeleteResult> {
    const result = await this.todoRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }
  async softDeleteDbTodo(id): Promise<UpdateResult> {
    const result = await this.todoRepository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }

  async restoreDbTodo(id: string): Promise<UpdateResult> {
    const result = await this.todoRepository.restore(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }

  findAll(searchCriteria: SearchTodoDto, options = {}): Promise<TodoEntity[]> {
    const criterias = [];
    const { status, criteria } = searchCriteria;
    if (criteria) {
      criterias.push({ name: Like(`%${criteria}%`) });
      criterias.push({ description: Like(`%${criteria}%`) });
    }
    if (status) {
      criterias.push({ status });
    }
    options = { ...options, where: criterias };
    return this.todoRepository.find(options);
  }

  async finTodoDbById(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
}
