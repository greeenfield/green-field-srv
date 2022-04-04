import { IsString, IsBoolean, IsJSON, IsArray } from 'class-validator'

export class CreateNoteDTO {
  @IsString()
  title: string

  @IsString()
  body: string

  @IsBoolean()
  isTemp: boolean

  @IsBoolean()
  isPrivate: boolean

  @IsArray()
  tags: string[]

  @IsJSON()
  meta: JSON
}
