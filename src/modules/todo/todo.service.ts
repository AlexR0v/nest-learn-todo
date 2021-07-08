import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity'
import { Repository } from 'typeorm'
import { CreateTodoDto } from './entities/todo.dto'


@Injectable()
export class TodoService {
  constructor(@InjectRepository(Todo) private todoRepo: Repository<Todo>) {
  }

  async findAll(): Promise<Todo[]> {
    return await this.todoRepo.find()
  }

  async findOne(id: string): Promise<Todo> {
    return await this.todoRepo.findOne(id)
  }

  async createTodo(todo: CreateTodoDto): Promise<Todo> {
    return await this.todoRepo.save(todo)
  }

  async updateTodo(id: string, todo: CreateTodoDto): Promise<Todo> {
    const updatedTodo: Todo = await this.todoRepo.findOne(id)
    updatedTodo.title = todo.title
    updatedTodo.isCompleted = todo.isCompleted
    return await this.todoRepo.save(updatedTodo)
  }

  async remove(id: string): Promise<Todo[]> {
    await this.todoRepo.delete(id)
    return await this.todoRepo.find()
  }
}
