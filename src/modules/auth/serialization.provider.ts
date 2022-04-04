import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import { InjectionToken } from '#shared/enum/injection-token'
import { UserRepository } from '#modules/user/domain/repository'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(@Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository) {
    super()
  }

  serializeUser(user: UserEntity, done: (err: Error, userId: string) => void) {
    done(null, user.id)
  }

  async deserializeUser(userId: any, done: (err: Error, user: UserEntity) => void) {
    const user = await this.userRepository.findById(userId)

    done(null, user.properties())
  }
}
