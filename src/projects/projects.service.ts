import { Injectable } from '@nestjs/common'
import { EntityManager } from '@mikro-orm/core'
import { CreateProjectDto } from './dto'
import { Project } from '../entities'

@Injectable()
export class ProjectsService {
  constructor(private readonly em: EntityManager) {}

  create(createProjectDto: CreateProjectDto) {
    const project = new Project(createProjectDto)
    this.em.persistAndFlush(project)
    return project
  }

  findAll() {
    return this.em.find(Project, {})
  }

  findOne(id: number) {
    return this.em.findOneOrFail(Project, id)
  }

  // update(id: number, updateProjectDto: UpdateProjectDto) {
  //   return `This action updates a #${id} project`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} project`;
  // }
}
