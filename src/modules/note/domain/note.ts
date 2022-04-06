import { AggregateRoot } from '@nestjs/cqrs'

import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'
import { NoteMetaEntity } from '#modules/note/infrastructure/entities/noteMeta.entity'

export type NoteRequireProperties = Required<{
  readonly id: string
}>

export type NoteOptionalProperties = Partial<{
  readonly userId: string
  readonly title: string
  readonly body: string
  readonly isTemp: boolean
  readonly isPrivate: boolean
  readonly noteMetas: NoteMetaEntity[]
  readonly tags: TagEntity[]
  readonly likes: number
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly releasedAt: Date
}>

export type NoteProperties = NoteRequireProperties & Required<NoteOptionalProperties>

export interface Note {
  properties: () => NoteProperties
  create: (properties: NoteProperties) => Promise<void>
}

export class NoteImplement extends AggregateRoot implements Note {
  private readonly id: string
  private readonly userId: string
  private title: string
  private body: string
  private isTemp: boolean
  private isPrivate: boolean
  private noteMetas: NoteMetaEntity[] | null = null
  private tags: TagEntity[] | null = null
  private likes: number
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()
  private releasedAt: Date | null = null

  constructor(properties: NoteRequireProperties & NoteOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties(): NoteProperties {
    return {
      id: this.id,
      userId: this.userId,
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
