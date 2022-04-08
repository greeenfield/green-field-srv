import { IsString, IsBoolean, IsJSON, IsArray } from 'class-validator'
import { Type } from 'class-transformer'
import { UrlMeta } from '#modules/note/domain/urlMeta'

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
  @Type(() => UrlMeta)
  urlMetas: UrlMeta[]
}
