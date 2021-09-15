import { TodoStatusEnum } from '../model/todo.model';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../job/dto/pagination.dto';

export class SearchTodoDto extends PaginationDto {
  @IsOptional()
  criteria: string;
  @IsOptional()
  @IsEnum(TodoStatusEnum)
  status: TodoStatusEnum;
}
