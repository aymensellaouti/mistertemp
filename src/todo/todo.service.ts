import { Injectable, NotFoundException } from "@nestjs/common";
import { TodoModel } from "./model/todo.model";
import { AddTodoDto } from "./dto/add-todo.dto";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { v4 as uuid4 } from 'uuid';
@Injectable()
export class TodoService {
  todos: TodoModel[] = [];

  constructor() {
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
  updateTodo(
    id: string,
    partialTodo: Partial<UpdateTodoDto>,
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
