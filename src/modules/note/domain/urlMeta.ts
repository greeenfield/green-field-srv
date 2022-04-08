import { Expose } from 'class-transformer'

export class UrlMeta {
  id: string

  noteId: string

  @Expose()
  url: string

  @Expose()
  thumbnail: string

  @Expose()
  title: string

  @Expose()
  description: string

  createdAt: Date

  updatedAt: Date
}
