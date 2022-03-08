import { Inject } from '@nestjs/common'
import { EventPublisher } from '@nestjs/cqrs'

import { User, UserImplement, UserProperties, UserProfileProperties } from '#modules/user/domain/user'

export class UserFactory {
  constructor(@Inject(EventPublisher) private readonly eventPublisher: EventPublisher) {}

  create(id: string, username: string, email: string, nickname: string, thumbnail: string, about: string): User {
    const user = new UserImplement()
    user.setUser({ id, username, email })
    user.setProfile({ id, nickname, thumbnail, about })

    return this.eventPublisher.mergeObjectContext(user)
  }

  reconstitute(userProperties: UserProperties, profileProperties: UserProfileProperties): User {
    const user = new UserImplement()
    user.setUser(userProperties)
    user.setProfile(profileProperties)

    return this.eventPublisher.mergeObjectContext(user)
  }
}
