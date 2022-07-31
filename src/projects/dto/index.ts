import { PartialType } from '@nestjs/mapped-types'

export class CreateProjectDto {
  title: string
}

export class CreateTodoDto {
  project?: number
  text: string
  isCompleted?: boolean
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
export class UpdateTodoDto extends PartialType(CreateTodoDto) {}
