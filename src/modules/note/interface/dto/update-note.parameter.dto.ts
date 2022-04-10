import { IsUUID } from 'class-validator'

export class UpdateNoteParamDTO {
  @IsUUID()
  readonly id: string
}
