import { IsString, IsBoolean, IsArray } from 'class-validator'
import { Type, Expose } from 'class-transformer'
import { UrlMeta } from '#modules/note/domain/urlMeta'

export class CreateNoteDTO {
  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsString()
  body: string

  @IsBoolean()
  @Expose({ name: 'is_temp' })
  isTemp: boolean

  @IsBoolean()
  @Expose({ name: 'is_private' })
  isPrivate: boolean

  @Expose()
  @IsArray()
  tags: string[]

  @IsArray()
  @Type(() => UrlMeta)
  @Expose({ name: 'url_metas' })
  urlMetas: UrlMeta[]
}
