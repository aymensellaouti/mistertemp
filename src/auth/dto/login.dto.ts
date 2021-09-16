import { PartialType } from '@nestjs/mapped-types';
import { Column } from 'typeorm';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @Column()
  @IsNotEmpty()
  username: string;
  @Column()
  @IsNotEmpty()
  password: string;
}
