import { Test } from '@nestjs/testing'
import { ForbiddenException } from '@nestjs/common'

import { CreateNoteHandler } from '#modules/note/application/commands/handler/create-note.handler'
import { UserRepository } from 'src/modules/user/domain/repository'
import { NoteRepository } from 'src/modules/note/domain/repository'
import { InjectionToken } from 'src/shared/enum/injection-token'
import { CreateNoteCommand } from '#modules/note/application/commands/implement/create-note.command'
import { UrlMeta } from '#modules/note/domain/urlMeta'
import { NoteFactory } from '#modules/note/domain/factory'

describe('CreateNoteHandler', () => {
  let createNoteHandler: CreateNoteHandler
  let userRepository: UserRepository
  let noteRepository: NoteRepository
  let noteFactory: NoteFactory

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateNoteHandler,
        {
          provide: InjectionToken.USER_REPOSITORY,
          useValue: {},
        },
        {
          provide: InjectionToken.NOTE_REPOSITORY,
          useValue: {},
        },
        {
          provide: NoteFactory,
          useValue: {},
        },
      ],
    }).compile()

    createNoteHandler = module.get(CreateNoteHandler)
    userRepository = module.get(InjectionToken.USER_REPOSITORY)
    noteRepository = module.get(InjectionToken.NOTE_REPOSITORY)
    noteFactory = module.get(NoteFactory)
  })

  const userId = 'userId'
  const title = 'title'
  const body = 'body'
  const isTemp = true
  const isPrivate = true
  const tags = ['test']
  const urlMetas = [new UrlMeta()]
  const thumbnail = 'abcdefg'

  describe('excute', () => {
    it('should throw ForbiddenException when user does not exist', async () => {
      // Given
      userRepository.findById = jest.fn()

      // When
      const command = new CreateNoteCommand(userId, title, body, isTemp, isPrivate, tags, urlMetas, thumbnail)

      // Then
      await expect(createNoteHandler.execute(command)).rejects.toThrowError(ForbiddenException)
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(userRepository.findById).toBeCalledWith(userId)
    })

    it('should execute CreateNoteCommand', async () => {
      // Given
      const user = { create: jest.fn() }
      const note = { create: jest.fn() }
      userRepository.findById = jest.fn().mockResolvedValue(user)
      noteFactory.create = jest.fn().mockReturnValue(note)
      noteRepository.newId = jest.fn().mockResolvedValue('noteId')
      noteRepository.findOrCreateTags = jest.fn()
      noteRepository.save = jest.fn()

      // When
      const command = new CreateNoteCommand(userId, title, body, isTemp, isPrivate, tags, urlMetas, thumbnail)

      // Then
      await expect(createNoteHandler.execute(command)).resolves.toEqual(undefined)
      expect(userRepository.findById).toBeCalledTimes(1)
      expect(noteFactory.create).toBeCalledTimes(1)
      expect(noteRepository.newId).toBeCalledTimes(1)
      expect(noteRepository.findOrCreateTags).toBeCalledTimes(1)
      expect(note.create).toBeCalledTimes(1)
      expect(noteRepository.save).toBeCalledTimes(1)
    })
  })
})
