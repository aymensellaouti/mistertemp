import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TodoStatusEnum } from './todo/model/todo.model';

@Entity({
  name: 'todo',
})
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({
    length: 50,
  })
  name: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: TodoStatusEnum,
    default: TodoStatusEnum.waiting,
  })
  status: TodoStatusEnum;
  @Column()
  createdAt: Date;
}
