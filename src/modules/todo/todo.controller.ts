import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common'
import { CreateTodoDto, UpdateTodoDto } from './entities/todo.dto'
import { Todo } from './entities/todo.entity'
import { TodoService } from './todo.service'

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {
  }

  @Get()
  getAllTodo(): Promise<Todo[]> {
    return this.todoService.findAll()
  }

  @Get(':id')
  async getOneTodo(@Param('id') id: string): Promise<Todo> {
    const todo = await this.todoService.findOne(id)
    if (!todo) {
      throw new NotFoundException(`Todo with id=${id} not found`)
    }
    return todo
  }

  @Put(':id')
  async updateTodo(@Param('id') id: string, @Body() todo: Todo): Promise<Todo> {
    const updatedTodo = await this.todoService.findOne(id)
    if (!updatedTodo) {
      throw new NotFoundException(`Todo with id=${id} not found`)
    }
    return this.todoService.updateTodo(id, todo)
  }

  @Post()
  createTodo(@Body() todo: CreateTodoDto): Promise<Todo> {
    return this.todoService.createTodo(todo)
  }

  @Delete(':id')
  deleteTodo(@Param('id') id: string): Promise<Todo[]> {
    return this.todoService.remove(id)
  }
}
