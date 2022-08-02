import { Collection, OneToMany, Property, Entity } from '@mikro-orm/core'
import { BaseEntity } from './base.entity'
import { Todo } from './todo.entity'

type InitialFields = {
  title: string
}

@Entity()
export class Project extends BaseEntity {
  constructor({ title }: InitialFields) {
    super()
    this.title = title
  }

  @Property()
  title!: string

  @OneToMany(() => Todo, todo => todo.project)
  todos = new Collection<Todo>(this)
}
