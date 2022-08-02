import { Injectable } from '@nestjs/common'
import { EntityRepository } from '@mikro-orm/core'
import { CreateProjectDto } from './dto'
import { Project } from '../entities'
import { InjectRepository } from '@mikro-orm/nestjs'

const fields = [
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
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: EntityRepository<Project>
  ) {}

  async create(createProjectDto: CreateProjectDto) {
    const project = this.projectRepository.create(createProjectDto)
    await this.projectRepository.persistAndFlush(project)
    return project
  }

  findAll() {
    return this.projectRepository.find({}, { fields })
  }

  findOne(id: number) {
    return this.projectRepository.findOneOrFail(id, { fields })
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
