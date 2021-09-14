import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TodoEntity } from "../todo.entity";

@Module({
  controllers: [TodoController],
  providers: [TodoService],
  imports: [TypeOrmModule.forFeature([TodoEntity])]
})
export class TodoModule {}
