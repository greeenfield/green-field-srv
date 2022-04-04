import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { NoteFactory } from '#modules/note/domain/factory'
import { NoteRepository } from '#modules/note/domain/repository'
import { InjectionToken } from '#shared/enum/injection-token'
import { UserRepository } from '#modules/user/domain/repository'

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand, void> {
  constructor(
    @Inject(InjectionToken.NOTE_REPOSITORY) private readonly noteRepository: NoteRepository,
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
    private readonly noteFactory: NoteFactory,
  ) {}

  async execute(command: CreateNoteCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId)
    this.noteFactory.create(await this.noteRepository.newId(), user)
    // return await this.noteRepository.save(note)
  }
}
