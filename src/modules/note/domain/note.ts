import { AggregateRoot } from '@nestjs/cqrs'

import { UrlMeta } from '#modules/note/domain/urlMeta'
import { Tag } from '#modules/note/domain/tag'

type NoteRequireProperties = Required<{
  readonly id: string
}>

type NoteOptionalProperties = Partial<{
  readonly userId: string
  readonly title: string
  readonly body: string
  readonly isTemp: boolean
  readonly isPrivate: boolean
  readonly urlMetas: UrlMeta[]
  readonly tags: Tag[]
  readonly likes: number
  readonly thumbnail: string
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly releasedAt: Date
}>

export type NoteProperties = NoteRequireProperties & Required<NoteOptionalProperties>

export interface Note {
  properties: () => NoteProperties
  create: () => NoteImplement
  update: (properties: NoteRequireProperties & NoteOptionalProperties) => NoteImplement
  commit: () => void
}

export class NoteImplement extends AggregateRoot implements Note {
  private id: string
  private userId: string
  private title: string
  private body: string
  private isTemp: boolean
  private isPrivate: boolean
  private urlMetas: UrlMeta[] | null
  private tags: Tag[] | null
  private likes: number
  private thumbnail: string
  private createdAt: Date
  private updatedAt: Date
  private releasedAt: Date

  constructor(properties: NoteRequireProperties & NoteOptionalProperties) {
    super()
    Object.assign(this, properties)
    this.urlMetas = Object.values(properties.urlMetas)
  }

  properties(): NoteProperties {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      body: this.body,
      isTemp: this.isTemp,
      isPrivate: this.isPrivate,
      urlMetas: this.urlMetas,
      tags: this.tags,
      thumbnail: this.thumbnail,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      releasedAt: this.releasedAt,
    }
  }

  private isPublic(): boolean {
    return this.isTemp === false && this.isPrivate === false
  }

  create(): NoteImplement {
    if (this.isPublic()) this.releasedAt = new Date()

    return this
  }

  update(properties: NoteRequireProperties & NoteOptionalProperties): NoteImplement {
    if (this.isPublic()) this.releasedAt = new Date()

    Object.assign(this, properties)
    this.updatedAt = new Date()
    this.urlMetas.forEach((urlMeta) => (urlMeta.updatedAt = new Date()))

    return this
  }
}
