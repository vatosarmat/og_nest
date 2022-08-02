import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto, UpdateTodoDto } from './dto'

@Controller('projects/:projectId/todos')
export class ProjectTodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Param('projectId') projectId: string, @Body() createTodoDto: CreateTodoDto) {
    createTodoDto.project = +projectId
    return this.todosService.create(createTodoDto)
  }

  @Get()
  findAll(@Param('projectId') projectId: string) {
    return this.todosService.findAll(+projectId)
  }

  @Get(':id')
  findOne(@Param('projectId') projectId: string, @Param('id') id: string) {
    return this.todosService.findOne(+id, +projectId)
  }

  @Patch(':id')
  update(
    @Param('projectId') projectId: string,
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto
  ) {
    return this.todosService.update(+id, updateTodoDto, +projectId)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.todosService.remove(+id);
  // }
}
