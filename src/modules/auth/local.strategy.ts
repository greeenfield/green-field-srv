import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'

import { LoginCommand } from '#modules/auth/application/commands/implement/login.command'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly commandBus: CommandBus) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string) {
    const user = await this.commandBus.execute(new LoginCommand(email, password))

    if (!user) {
      throw new UnauthorizedException()
    }

    return user
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw err || new UnauthorizedException()
    }
    return user
  }
}
