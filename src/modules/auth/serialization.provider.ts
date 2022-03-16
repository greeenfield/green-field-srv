import { Inject, Injectable } from '@nestjs/common'
import { PassportSerializer } from '@nestjs/passport'

import { injectionToken } from '#shared/injection-token'
import { UserRepository } from '#modules/user/domain/repository'

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(@Inject(injectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository) {
    super()
  }

  serializeUser(user: any, done: (err, user) => void) {
    done(null, user)
  }

  deserializeUser(payload: any, done: (err, user) => void) {
    done(null, payload)
  }
}
