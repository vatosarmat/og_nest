import { PartialType } from '@nestjs/mapped-types'

export class CreateProjectDto {
  title: string
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
