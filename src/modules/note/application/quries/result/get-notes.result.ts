import { IQueryResult } from '@nestjs/cqrs'
import { Expose, Type } from 'class-transformer'

class User {
  @Expose()
  readonly id: string

  @Expose()
  readonly username: string

  @Expose()
  readonly thumbnail: string
}

export class UrlMeta {
  @Expose()
  url: string

  @Expose()
  thumbnail: string

  @Expose()
  title: string

  @Expose()
  description: string
}

export class Note {
  @Expose()
  readonly id: string

  @Expose()
  readonly title: string

  @Expose()
  readonly likes: number

  @Expose()
  readonly thumbnail: string

  @Expose()
  @Type(() => User)
  readonly user: User

  @Expose()
  @Type(() => UrlMeta)
  readonly urlMetas: UrlMeta[]

  @Expose()
  readonly tags: string[]

  @Expose()
  readonly updatedAt: Date
}

export class GetNotesResult extends Array<Note> implements IQueryResult {}
