import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { UpdateNoteCommand } from '#modules/note/application/commands/implement/update-note.command'
import { NoteRepository } from '#modules/note/domain/repository'
import { InjectionToken } from '#shared/enum/injection-token'
import { UserRepository } from '#modules/user/domain/repository'

@CommandHandler(UpdateNoteCommand)
export class UpdateNoteHandler implements ICommandHandler<UpdateNoteCommand, void> {
  constructor(
    @Inject(InjectionToken.NOTE_REPOSITORY) private readonly noteRepository: NoteRepository,
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: UpdateNoteCommand): Promise<void> {
    const { id, userId, title, body, isTemp, isPrivate, urlMetas, thumbnail } = command

    const [user, note] = await Promise.all([this.userRepository.findById(userId), this.noteRepository.findById(id)])

    if (!user) {
      throw new Error('')
    }

    if (!note) {
      throw new Error('')
    }

    const tags = await this.noteRepository.findOrCreateTags(command.tags)

    note.update({ id, userId, title, body, isTemp, isPrivate, tags, urlMetas, thumbnail })

    return await this.noteRepository.save(note.create())
  }
}
