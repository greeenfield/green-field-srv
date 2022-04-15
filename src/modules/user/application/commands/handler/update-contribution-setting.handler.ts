import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject, NotFoundException } from '@nestjs/common'

import { InjectionToken } from '#shared/enum/injection-token'

import { UpdateContributionSettingCommand } from '#modules/user/application/commands/implement/update-contribution-setting.command'
import { UserRepository } from '#modules/user/domain/repository'

@CommandHandler(UpdateContributionSettingCommand)
export class UpdateContributionSettingHandler implements ICommandHandler<UpdateContributionSettingCommand, void> {
  constructor(@Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(command: UpdateContributionSettingCommand): Promise<void> {
    const { userId, privateContribution } = command

    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new NotFoundException()
    }

    await this.userRepository.updateContributionSetting(userId, privateContribution)
  }
}
