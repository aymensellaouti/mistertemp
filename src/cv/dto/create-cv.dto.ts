import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform, Type } from "class-transformer";
import { User } from '../../user/entities/user.entity';
import { Skill } from '../../skill/entities/skill.entity';

export class CreateCvDto {
  @IsString()
  @MinLength(2)
  name: string;
  @IsString()
  @MinLength(2)
  firstname: string;
  @IsString()
  @MinLength(3)
  job: string;
  @IsOptional()
  path: string;
  @IsString()
  cin: string;
  @Type(() => Number)
  @IsNumber()
  age: number;
  @IsOptional()
  skills: Skill[];
  @IsOptional()
  user: User;
}
