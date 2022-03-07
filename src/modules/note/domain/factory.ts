import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Note, NoteImplement, NoteProperties } from './note'
import { User } from '#modules/user/domain/user'

export class NoteFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  // Fix Interface
  public create(id: string, user: User): Note {
    return this.eventPublisher.mergeObjectContext(new NoteImplement({ id }))
  }

  reconstitute(properties: NoteProperties) {
    return this.eventPublisher.mergeObjectContext(new NoteImplement(properties))
  }
}
