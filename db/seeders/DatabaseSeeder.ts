import { readFile } from 'fs/promises'
import * as yaml from 'yaml'
import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

import { Project, ProjectFields, Todo, TodoFields } from '../../src/entities'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const yamlData = await readFile(`${__dirname}/seeds.yaml`, 'utf8')
    const data: { projects: ProjectFields[] } = yaml.parse(yamlData)

    const projectTodos = new Map<Project, TodoFields[]>()
    for (const projectFields of data.projects) {
      const project = new Project(projectFields)
      em.persist(project)
      projectTodos.set(project, projectFields.todos)
    }
    await em.flush()

    projectTodos.forEach((todos, project) => {
      for (const todo of todos) {
        // console.log(todo)
        // console.log(project)
        todo.project = project.id
        em.persist(new Todo(todo))
      }
    })
    em.flush()
  }
}
