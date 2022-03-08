import { Body, Controller, Post } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { CreateUserDTO } from '#modules/user/interface/dto/create-user.body.dto'

import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'

@Controller('user')
export class UserController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Post()
  async CreateUser(@Body() body: CreateUserDTO): Promise<void> {
    const { username, email, nickname, thumbnail, about } = body

    return this.commandBus.execute(new CreateUserCommand(username, email, nickname, thumbnail, about))
  }
}
