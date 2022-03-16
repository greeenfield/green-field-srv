import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { LoginDTO } from '#modules/auth/interface/dto/login.body.dto'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post()
  async login(@Body() body: LoginDTO): Promise<void> {
    const { email, password } = body

    return this.commandBus.execute(new LoginCommand())
  }
}
