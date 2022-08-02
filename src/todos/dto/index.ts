export class CreateTodoDto {
  project: number
  text: string
}

export class UpdateTodoDto {
  isCompleted: boolean
}
