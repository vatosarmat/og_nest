import {
  Entity,
  IdentifiedReference,
  ManyToOne,
  Property,
  Reference,
} from '@mikro-orm/core'
import { CreateTodoDto } from '../projects/dto'
import { BaseEntity } from './base.entity'
import { Project } from './project.entity'

@Entity()
export class Todo extends BaseEntity {
  constructor(dto: CreateTodoDto) {
    super()
    this.text = dto.text
    this.project = Reference.createFromPK(Project, dto.project)
    if (dto.isCompleted !== undefined) {
      this.isCompleted = dto.isCompleted
    }
  }

  @Property()
  text!: string

  @Property({ default: false })
  isCompleted!: boolean

  @ManyToOne(() => Project, { wrappedReference: true })
  project!: IdentifiedReference<Project>
}

export type TodoFields = Omit<Todo, 'project'> & {
  project: number
}
