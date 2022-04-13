import { ICommand } from '@nestjs/cqrs'

export class RemoveNoteCommand implements ICommand {
  constructor(readonly id: string, readonly userId: string) {}
}
