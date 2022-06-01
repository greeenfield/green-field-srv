import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { InjectionToken } from '#shared/enum/injection-token'

import { GetMeCommand } from '#modules/user/application/commands/implement/get-me.command'
import { UserRepository } from '#modules/user/domain/repository'
import { User } from '#modules/user/domain/user'

@CommandHandler(GetMeCommand)
export class GetMeHandler implements ICommandHandler<GetMeCommand, User> {
  constructor(@Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(command: GetMeCommand): Promise<User> {
    return await this.userRepository.findById(command.id)
  }
}
