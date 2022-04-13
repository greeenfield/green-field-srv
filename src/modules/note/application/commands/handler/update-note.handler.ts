import { ForbiddenException, Inject, NotFoundException } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UpdateNoteCommand } from '#modules/note/application/commands/implement/update-note.command'
import { NoteRepository } from '#modules/note/domain/repository'
import { InjectionToken } from '#shared/enum/injection-token'

@CommandHandler(UpdateNoteCommand)
export class UpdateNoteHandler implements ICommandHandler<UpdateNoteCommand, void> {
  constructor(@Inject(InjectionToken.NOTE_REPOSITORY) private readonly noteRepository: NoteRepository) {}

  async execute(command: UpdateNoteCommand): Promise<void> {
    const { id, userId, title, body, isTemp, isPrivate, urlMetas, thumbnail } = command

    const note = await this.noteRepository.findById(id)

    if (userId !== note.properties().userId) {
      throw new ForbiddenException()
    }

    if (!note) {
      throw new NotFoundException()
    }

    const tags = await this.noteRepository.findOrCreateTags(command.tags)

    note.update({ id, userId, title, body, isTemp, isPrivate, tags, urlMetas, thumbnail })

    return await this.noteRepository.save(note.create())
  }
}
