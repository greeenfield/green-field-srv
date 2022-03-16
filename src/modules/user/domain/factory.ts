import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { User, UserImplement, UserProperties } from '#modules/user/domain/user'

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create({
    id,
    profileId,
    username,
    email,
    nickname,
    thumbnail,
    about,
  }: {
    id?: string
    profileId?: string
    username?: string
    email: string
    nickname?: string
    thumbnail?: string
    about?: string
  }): User {
    const user = new UserImplement({ id, email, username })
    user.setProfile({ id: profileId, nickname, about, thumbnail })

    return this.eventPublisher.mergeObjectContext(user)
  }

  reconstitute(userProperties: UserProperties): User {
    const user = new UserImplement(userProperties)

    return this.eventPublisher.mergeObjectContext(user)
  }
}
