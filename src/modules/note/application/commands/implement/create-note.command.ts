import { ICommand } from '@nestjs/cqrs'

export class CreateNoteCommand implements ICommand {
  constructor(
    readonly userId: string,
    readonly title: string,
    readonly body: string,
    readonly isTemp: boolean,
    readonly isPrivate: boolean,
    readonly tags: string[],
    readonly meta: JSON,
  ) {}
}
