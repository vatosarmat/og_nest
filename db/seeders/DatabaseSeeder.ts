import { readFile } from 'fs/promises'
import * as yaml from 'yaml'
import type { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'

import { Project, ProjectFields, Todo } from '../../src/entities'

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const yamlData = await readFile(`${__dirname}/seeds.yaml`, 'utf8')
    const data: { projects: ProjectFields[] } = yaml.parse(yamlData)

    for (const projectFields of data.projects) {
      const project = new Project(projectFields)
      project.todos.add(...projectFields.todos.map(t => new Todo(t)))
      em.persist(project)
    }
    await em.flush()
  }
}
