import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { User, UserImplement, UserProperties } from '#modules/user/domain/user'

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(id: string, email: string, nickname: string, username: string): User {
    return this.eventPublisher.mergeObjectContext(new UserImplement({ id, email, nickname, username }))
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties))
  }
}
