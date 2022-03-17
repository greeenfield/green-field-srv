import { Controller, Post, Body } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { CreateNoteDTO } from '#modules/note/interface/dto/create-note.dto'

@Controller('note')
export class NoteController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  async createNote(@Body() body: CreateNoteDTO) {
    const command = new CreateNoteCommand(body.userId)
    await this.commandBus.execute(command)
  }
}
