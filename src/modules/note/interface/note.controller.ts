import { Controller, Post, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CommandBus } from '@nestjs/cqrs'

import { Auth } from '#modules/auth/auth.decorator'
import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { UploadImageCommand } from '#modules/note/application/commands/implement/upload-image.command'
import { CreateNoteDTO } from '#modules/note/interface/dto/create-note.dto'
import { UploadImageResponseDTO } from '#modules/note/interface/dto/upload-image.response.dto'

import { UserId } from '#shared/decorator/userId.decorator'

@Controller('note')
@Auth()
export class NoteController {
  constructor(readonly commandBus: CommandBus) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() uploadedFile): Promise<UploadImageResponseDTO> {
    const command = new UploadImageCommand(uploadedFile)

    return await this.commandBus.execute(command)
  }

  @Post()
  async createNote(@UserId() userId: string, @Body() body: CreateNoteDTO) {
    const { title, isTemp, isPrivate, tags, urlMetas, thumbnail } = body
    const command = new CreateNoteCommand(userId, title, body.body, isTemp, isPrivate, tags, urlMetas, thumbnail)

    await this.commandBus.execute(command)
  }
}
