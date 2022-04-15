import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { Auth } from '#modules/auth/auth.decorator'
import { UserId } from '#shared/decorator/userId.decorator'

import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { UploadImageCommand } from '#modules/note/application/commands/implement/upload-image.command'
import { UpdateNoteCommand } from '#modules/note/application/commands/implement/update-note.command'
import { RemoveNoteCommand } from '#modules/note/application/commands/implement/remove-note.command'

import { GetNotesQuery } from '#modules/note/application/quries/implement/get-notes.query'
import { GetContributionsQuery } from '#modules/note/application/quries/implement/get-contributions.query'

import { CreateNoteDTO } from '#modules/note/interface/dto/create-note.dto'
import { UpdateNoteDTO } from '#modules/note/interface/dto/update-note.dto'
import { UpdateNoteParamDTO } from '#modules/note/interface/dto/update-note.parameter.dto'
import { RemoveNoteParamDTO } from '#modules/note/interface/dto/remove-note.parameter.dto'
import { UploadImageResponseDTO } from '#modules/note/interface/dto/upload-image.response.dto'
import { GetNotesResponseDTO } from '#modules/note/interface/dto/get-notes.response.dto'
import { GetContributionsDTO } from '#modules/note/interface/dto/get-contributions.dto'

@Controller('note')
export class NoteController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @Auth()
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() uploadedFile): Promise<UploadImageResponseDTO> {
    const command = new UploadImageCommand(uploadedFile)

    return await this.commandBus.execute(command)
  }

  @Auth()
  @Post()
  async createNote(@UserId() userId: string, @Body() body: CreateNoteDTO) {
    const { title, isTemp, isPrivate, tags, urlMetas, thumbnail } = body
    const command = new CreateNoteCommand(userId, title, body.body, isTemp, isPrivate, tags, urlMetas, thumbnail)

    await this.commandBus.execute(command)
  }

  @Auth()
  @Put('/:id')
  async updateNote(@UserId() userId: string, @Param() param: UpdateNoteParamDTO, @Body() body: UpdateNoteDTO) {
    const { title, isTemp, isPrivate, tags, urlMetas, thumbnail } = body
    const command = new UpdateNoteCommand(
      param.id,
      userId,
      title,
      body.body,
      isTemp,
      isPrivate,
      tags,
      urlMetas,
      thumbnail,
    )

    await this.commandBus.execute(command)
  }

  @Auth()
  @Delete('/:id')
  async RemoveNote(@UserId() userId: string, @Param() param: RemoveNoteParamDTO) {
    const command = new RemoveNoteCommand(param.id, userId)

    await this.commandBus.execute(command)
  }

  @Get()
  async getNotes(): Promise<GetNotesResponseDTO> {
    const query = new GetNotesQuery(0, 20, -30)
    return await this.queryBus.execute(query)
  }

  @Auth()
  @Get('contributions')
  async getContributions(@Body() body: GetContributionsDTO) {
    const query = new GetContributionsQuery(body.userId, body.beginDate, body.endDate)
    return await this.queryBus.execute(query)
  }
}
