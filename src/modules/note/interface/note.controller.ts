import { Controller, Post, Body } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'

import { Auth } from '#modules/auth/auth.decorator'
import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { CreateNoteDTO } from '#modules/note/interface/dto/create-note.dto'

import { UserId } from '#shared/decorator/userId.decorator'

@Controller('note')
@Auth()
export class NoteController {
  constructor(readonly commandBus: CommandBus) {}

  @Post()
  async createNote(@UserId() userId: string, @Body() body: CreateNoteDTO) {
    const { title, isTemp, isPrivate, tags, meta } = body
    const command = new CreateNoteCommand(userId, title, body.body, isTemp, isPrivate, tags, meta)
    await this.commandBus.execute(command)
  }
}

// Session {
//   cookie: {
//     path: '/',
//     _expires: 2022-04-04T06:56:45.379Z,
//     originalMaxAge: 60000,
//     httpOnly: true
//   },
//   passport: { user: 'd0b1a0e5-67bc-42ed-8bef-035a504f3853' }
// }
