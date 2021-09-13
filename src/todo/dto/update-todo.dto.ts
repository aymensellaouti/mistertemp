import { TodoStatusEnum } from '../model/todo.model';

export class UpdateTodoDto {
  name: string;
  description: string;
  status: TodoStatusEnum;
}
