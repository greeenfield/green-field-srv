import { Body, Put, Controller, Post } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { Auth } from '#modules/auth/auth.decorator'
import { UserId } from '#shared/decorator/userId.decorator'

import { CreateUserDTO } from '#modules/user/interface/dto/create-user.body.dto'
import { UpdateContributionSettingDTO } from '#modules/user/interface/dto/update-contribution-setting.dto'
import { CreateUserCommand } from '#modules/user/application/commands/implement/create-user.command'
import { UpdateContributionSettingCommand } from '#modules/user/application/commands/implement/update-contribution-setting.command'

@Controller('user')
export class UserController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  async CreateUser(@Body() body: CreateUserDTO): Promise<void> {
    const { username, email, nickname, thumbnail, about, password } = body

    return this.commandBus.execute(new CreateUserCommand(username, email, nickname, thumbnail, about, password))
  }

  @Auth()
  @Put('contribution-setting')
  async UpdateContributionSetting(@UserId() userId: string, @Body() body: UpdateContributionSettingDTO) {
    return this.commandBus.execute(new UpdateContributionSettingCommand(userId, body.privateContribution))
  }
}
