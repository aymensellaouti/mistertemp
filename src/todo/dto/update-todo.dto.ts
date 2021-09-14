import { TodoStatusEnum } from '../model/todo.model';
import { IsIn, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../constantes/error-messages';
import { PartialType } from "@nestjs/mapped-types";
import { AddTodoDto } from "./add-todo.dto";

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsIn([TodoStatusEnum.waiting, TodoStatusEnum.actif, TodoStatusEnum.done])
  status: TodoStatusEnum;
}
