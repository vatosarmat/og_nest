import {
  Entity,
  IdentifiedReference,
  Reference,
  ManyToOne,
  Property,
} from '@mikro-orm/core'
import { BaseEntity } from './base.entity'
import { Project } from './project.entity'

type InitialFields = {
  text: string
  isCompleted?: boolean
  project?: number
}

@Entity()
export class Todo extends BaseEntity {
  constructor({ text, isCompleted, project }: InitialFields) {
    super()
    this.text = text
    if (isCompleted !== undefined) {
      this.isCompleted = isCompleted
    }
    if (project !== undefined) {
      this.project = Reference.createFromPK(Project, project)
    }
  }

  @Property()
  text!: string

  @Property({ default: false })
  isCompleted!: boolean

  @ManyToOne(() => Project, { wrappedReference: true })
  project!: IdentifiedReference<Project, 'id'>
}
