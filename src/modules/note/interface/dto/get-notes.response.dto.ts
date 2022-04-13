import { IsString, IsArray, IsDate, IsUUID, IsObject, IsInt } from 'class-validator'
import { Type, Expose } from 'class-transformer'
import { UrlMeta } from '#modules/note/domain/urlMeta'
import { GetNotesResult } from '#modules/note/application/quries/result/get-notes.result'

export class GetNotesResponseDTO extends GetNotesResult {
  @Expose()
  @Type(() => Note)
  @IsArray()
  notes: Note[]
}

class Note {
  @Expose()
  @IsUUID()
  id: string

  @Expose()
  @IsString()
  title: string

  @Expose()
  @IsString()
  thumbnail: string

  @Expose()
  @Type(() => User)
  @IsObject()
  user: User

  @Expose()
  @IsInt()
  likes: number

  @Expose({ name: 'url_metas' })
  @Type(() => UrlMeta)
  @IsArray()
  urlMetas: UrlMeta[]

  @Expose({ name: 'updated_at' })
  @IsDate()
  updatedAt: Date

  @Expose({ name: 'short_description' })
  @IsString()
  shortDescription: string

  @Expose()
  @IsArray()
  tags: string[]
}

class User {
  @Expose()
  @IsUUID()
  id: string

  @Expose()
  @IsString()
  username: string

  @Expose()
  @IsString()
  thumbnail: string
}
