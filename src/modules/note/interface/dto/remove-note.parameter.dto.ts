import { IsUUID } from 'class-validator'

export class RemoveNoteParamDTO {
  @IsUUID()
  readonly id: string
}
