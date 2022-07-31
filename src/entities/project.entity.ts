import { Collection, OneToMany, Property, Entity } from '@mikro-orm/core'
import { CreateProjectDto } from '../projects/dto'
import { BaseEntity } from './base.entity'
import { Todo, TodoFields } from './todo.entity'

@Entity()
export class Project extends BaseEntity {
  constructor(dto: CreateProjectDto) {
    super()
    this.title = dto.title
  }

  @Property()
  title!: string

  @OneToMany(() => Todo, todo => todo.project)
  todos = new Collection<Todo>(this)
}

export type ProjectFields = Omit<Project, 'todos'> & {
  todos: TodoFields[]
}
