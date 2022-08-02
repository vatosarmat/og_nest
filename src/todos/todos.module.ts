import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { ProjectTodosController } from './project_todos.controller'
import { Todo } from '../entities'
import { MikroOrmModule } from '@mikro-orm/nestjs'

@Module({
  imports: [MikroOrmModule.forFeature([Todo])],
  controllers: [TodosController, ProjectTodosController],
  providers: [TodosService],
})
export class TodosModule {}
