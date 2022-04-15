import { ICommand } from '@nestjs/cqrs'

export class UpdateContributionSettingCommand implements ICommand {
  constructor(readonly userId: string, readonly privateContribution: boolean) {}
}
