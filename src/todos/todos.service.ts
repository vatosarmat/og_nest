import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { CreateTodoDto, UpdateTodoDto } from './dto'
import { Todo } from '../entities'
import { InjectRepository } from '@mikro-orm/nestjs'

const fields = [
  'id',
  // 'createdAt',
  // 'updatedAt',
  'text',
  'isCompleted',
] as const

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: EntityRepository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    const todo = this.todoRepository.create(createTodoDto)
    await this.todoRepository.persistAndFlush(todo)
    return todo
  }

  findAll(projectId?: number) {
    const where = projectId === undefined ? {} : { project: projectId }
    return this.todoRepository.find(where, { fields })
  }

  findOne(id: number, projectId?: number) {
    const where = projectId === undefined ? { id } : { id, project: projectId }
    return this.todoRepository.findOneOrFail(where, { fields })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto, projectId?: number) {
    const where = projectId === undefined ? { id } : { id, project: projectId }
    const todo = await this.todoRepository.findOneOrFail(where, { fields })
    todo.isCompleted = updateTodoDto.isCompleted
    this.todoRepository.persistAndFlush(todo)
    return todo
  }

  // remove(id: number) {
  //   return `This action removes a #${id} todo`
  // }
}
