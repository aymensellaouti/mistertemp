import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ERROR_MESSAGES } from '../../constantes/error-messages';

export class AddTodoDto {
  @IsNotEmpty()
  @MaxLength(6, {
    message: ERROR_MESSAGES.taille(false),
  })
  @MinLength(3, {
    message: ERROR_MESSAGES.taille(),
  })
  name: string;
  @IsNotEmpty()
  @MinLength(6, {
    message: ERROR_MESSAGES.taille(),
  })
  description: string;
}
