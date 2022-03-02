import { AggregateRoot } from '@nestjs/cqrs'

import { Tag } from '#modules/note/infrastructure/entities/tag.entity'
import { NoteMeta } from '#modules/note/infrastructure/entities/noteMeta.entity'

import { User } from '#modules/user/infrastructure/entities/user.entity'

export type NoteRequireProperties = Required<{
  readonly id: string
  readonly user: User
}>

export type NoteOptionalProperties = Partial<{
  readonly title: string
  readonly body: string
  readonly isTemp: boolean
  readonly isPrivate: boolean
  readonly noteMetas: NoteMeta[]
  readonly tags: Tag[]
  readonly likes: number
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly releasedAt: Date
}>

export type NoteProperties = NoteRequireProperties & NoteOptionalProperties

export interface Note {
  properties: () => NoteProperties
  create: (properties: NoteProperties) => Promise<void>
}

export class NoteImplement extends AggregateRoot implements Note {
  private readonly id: string
  private readonly user: User
  private readonly title: string = ''
  private readonly body: string = ''
  private readonly isTemp: boolean = false
  private readonly isPrivate: boolean = false
  private readonly noteMetas: NoteMeta[] | null = null
  private readonly tags: Tag[] | null = null
  private readonly likes: number = 0
  private readonly createdAt: Date = new Date()
  private readonly updatedAt: Date = new Date()
  private readonly releasedAt: Date | null = null

  constructor(properties: NoteRequireProperties & NoteOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties(): NoteProperties {
    return {
      id: this.id,
      user: this.user,
      title: this.title,
      body: this.body,
      isTemp: this.isTemp,
      isPrivate: this.isPrivate,
      noteMetas: this.noteMetas,
      tags: this.tags,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      releasedAt: this.releasedAt,
    }
  }

  async create(properties: NoteProperties): Promise<void> {
    console.log(properties)
    return
  }
}
