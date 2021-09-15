import { TodoStatusEnum } from '../model/todo.model';
import { IsEnum, IsIn, IsOptional } from 'class-validator';

export class SearchTodoDto {
  @IsOptional()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
