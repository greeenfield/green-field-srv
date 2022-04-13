import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Note, NoteImplement, NoteProperties } from '#modules/note/domain/note'
import { UrlMeta } from '#modules/note/domain/urlMeta'
import { Tag } from '#modules/note/domain//tag'

export class NoteFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  public create({
    id,
    userId,
    title,
    body,
    isTemp,
    isPrivate,
    urlMetas,
    tags,
    thumbnail,
  }: {
    id: string
    userId: string
    title: string
    body: string
    isTemp: boolean
    isPrivate: boolean
    urlMetas: UrlMeta[]
    tags: Tag[]
    thumbnail: string
  }): Note {
    return this.eventPublisher.mergeObjectContext(
      new NoteImplement({ id, userId, title, body, isTemp, isPrivate, urlMetas, tags, thumbnail }),
    )
  }

  reconstitute(properties: NoteProperties) {
    return this.eventPublisher.mergeObjectContext(new NoteImplement(properties))
  }
}
