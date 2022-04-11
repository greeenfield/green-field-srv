import { IQueryResult } from '@nestjs/cqrs'
import { Expose, Type } from 'class-transformer'

class User {
  @Expose({ name: 'user_id' })
  readonly id: string

  @Expose({ name: 'user_username' })
  readonly username: string

  @Expose({ name: 'userProfile_thumbnail' })
  readonly thumbnail: string
}

export class UrlMeta {
  @Expose({ name: 'urlMeta_url' })
  url: string

  @Expose({ name: 'urlMeta_thumbnail' })
  thumbnail: string

  @Expose({ name: 'urlMeta_title' })
  title: string

  @Expose({ name: 'urlMeta_description' })
  description: string
}

export class Note {
  @Expose({ name: 'note_id' })
  readonly id: string

  @Expose({ name: 'note_title' })
  readonly title: string

  @Expose({ name: 'note_likes' })
  readonly likes: number

  @Expose({ name: 'note_thumbnail' })
  readonly thumbnail: string

  @Type(() => User)
  readonly user: User

  @Type(() => UrlMeta)
  readonly urlMetas: UrlMeta[]

  @Expose({ name: 'tag_name' })
  readonly tags: string[]

  @Expose({ name: 'note_updated_at' })
  readonly updatedAt: Date
}

export class Notes extends Array<Note> {}

export class GetNotesResult implements IQueryResult {
  notes: Note[]
}
