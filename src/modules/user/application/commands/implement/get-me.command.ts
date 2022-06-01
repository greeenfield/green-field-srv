import { ICommand } from '@nestjs/cqrs'

export class GetMeCommand implements ICommand {
  constructor(readonly id: string) {}
}
