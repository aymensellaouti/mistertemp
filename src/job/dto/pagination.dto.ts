import { IsInt, IsOptional, IsPositive } from 'class-validator';
import { Type } from "class-transformer";

export class PaginationDto {
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsPositive()
  page = 1;
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @IsPositive()
  pageSize = 5;
}
