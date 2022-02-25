import { ICommand } from '@nestjs/cqrs'

export class CreateNoteCommand implements ICommand {
  constructor(readonly userId: string) {}
}
