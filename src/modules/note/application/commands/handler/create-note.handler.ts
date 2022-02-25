import { Inject } from '@nestjs/common'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'

import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { NoteFactory } from '#modules/note/domain/factory'
import { NoteRepository } from '#modules/note/domain/repository'
import { UserRepository } from '#modules/user/domain/repository'

@CommandHandler(CreateNoteCommand)
export class CreateNoteHandler implements ICommandHandler<CreateNoteCommand, void> {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly noteRepository: NoteRepository,
    private readonly noteFactory: NoteFactory,
  ) {}

  async execute(command: CreateNoteCommand): Promise<void> {
    const user = await this.userRepository.findById(command.userId)
    const note = this.noteFactory.create(this.noteRepository.generateId(), user)

    return await this.noteRepository.save(note)
  }
}
