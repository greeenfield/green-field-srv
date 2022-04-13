import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { RemoveNoteCommand } from '#modules/note/application/commands/implement/remove-note.command'
import { NoteRepository } from '#modules/note/domain/repository'
import { InjectionToken } from '#shared/enum/injection-token'

@CommandHandler(RemoveNoteCommand)
export class RemoveNoteHandler implements ICommandHandler<RemoveNoteCommand, void> {
  constructor(@Inject(InjectionToken.NOTE_REPOSITORY) private readonly noteRepository: NoteRepository) {}

  async execute(command: RemoveNoteCommand): Promise<void> {
    const { id, userId } = command

    const note = await this.noteRepository.findById(id)

    if (userId !== note.properties().userId) {
      throw new ForbiddenException()
    }

    if (!note) {
      throw new NotFoundException()
    }

    await this.noteRepository.removeById(id)
  }
}
