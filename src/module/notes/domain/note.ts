import { AggregateRoot } from '@nestjs/cqrs'

import { Tag } from '../../../entity/tag.entity'

export type NoteRequireProperties = Required<{
  readonly id: string
  readonly userId: string
  readonly title: string
  readonly body: string
}>

export type NoteOptionalProperties = Required<{
  readonly tags: Tag[]
  readonly isTemp: boolean
  readonly isPrivate: boolean
  readonly likes: number
  readonly createdAt: number
  readonly updatedAt: number
  readonly releasedAt: number
}>

export type NoteProperties = NoteRequireProperties & NoteOptionalProperties

export interface Note {
  properties: () => NoteProperties
  create: () => Promise<void>
}

export class NoteImplement extends AggregateRoot implements Note {
  id: string
  userId: string
  title: string
  body: string
  isTemp: boolean
  isPrivate: boolean
  likes: number
  createdAt: number
  updatedAt: number
  releasedAt: number

  constructor(properties: NoteRequireProperties & NoteOptionalProperties) {
    super()
    Object.assign(this, properties)
  }
}
