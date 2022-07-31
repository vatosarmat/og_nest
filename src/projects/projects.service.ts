import { Injectable } from '@nestjs/common'
import { EntityManager } from '@mikro-orm/core'
import { CreateProjectDto } from './dto'
import { Project } from '../entities'

const projectFields = [
  'id',
  // 'createdAt',
  // 'updatedAt',
  'title',
  'todos.id',
  // 'todos.createdAt',
  // 'todos.updatedAt',
  'todos.text',
  'todos.isCompleted',
] as const

@Injectable()
export class ProjectsService {
  constructor(private readonly em: EntityManager) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto)
    this.em.persistAndFlush(project)
    return project
  }

  findAll() {
    return this.em.find(Project, {}, { fields: projectFields })
  }

  findOne(id: number) {
    return this.em.findOneOrFail(Project, id, { fields: projectFields })
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
