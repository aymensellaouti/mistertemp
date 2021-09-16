import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UpdateResult } from 'typeorm/query-builder/result/UpdateResult';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';

@Injectable()
export class CrudService<T> {
  constructor(private readonly repository: Repository<T>) {}

  create(addDto): Promise<T> {
    return this.repository.save(addDto);
  }
  async update(id: string | number, updateDto): Promise<T> {
    const entity = await this.repository.preload({ id, ...updateDto });
    if (!entity) {
      throw new NotFoundException();
    }
    return this.repository.save(entity);
    // return this.todoRepository.update(id, updateTodoDto);
  }
  async deleteHard(id: string | number): Promise<DeleteResult> {
    const result = await this.repository.delete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }
  async remove(id: string | number): Promise<UpdateResult> {
    const result = await this.repository.softDelete(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }

  async restore(id: string | number): Promise<UpdateResult> {
    const result = await this.repository.restore(id);
    if (!result.affected) {
      throw new NotFoundException();
    }
    return result;
  }

  findAll(options = {}): Promise<T[]> {
    return this.repository.find(options);
  }

  async findOne(id: string | number): Promise<T> {
    const todo = await this.repository.findOne(id);
    if (!todo) {
      throw new NotFoundException();
    }
    return todo;
  }
}
