import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { Note } from './note'

export class NoteFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  // create(): Note {
  // return this.eventPublisher.mergeObjectContext(new Note())
  // }
}
