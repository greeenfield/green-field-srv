import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { User, UserImplement, UserProperties } from '#modules/user/domain/user'

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(
    id: string,
    username: string,
    email: string,
    nickname: string,
    password: string,
    thumbnail: string,
    about: string,
  ): User {
    return this.eventPublisher.mergeObjectContext(
      new UserImplement({ id, username, email, nickname, password, thumbnail, about }),
    )
  }

  reconstitute(properties: UserProperties): User {
    return this.eventPublisher.mergeObjectContext(new UserImplement(properties))
  }
}
