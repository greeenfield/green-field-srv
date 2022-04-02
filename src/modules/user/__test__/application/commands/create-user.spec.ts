import { Test } from '@nestjs/testing'

import { injectionToken } from 'src/shared/enum/injection-token'

import { UserFactory } from 'src/modules/user/domain/factory'
import { UserRepository } from 'src/modules/user/domain/repository'
import { CreateUserHandler } from 'src/modules/user/application/commands/handler/create-user.handler'
import { CreateUserCommand } from 'src/modules/user/application/commands/implement/create-user.command'

describe('CreateUserHandler', () => {
  let createUserHandler: CreateUserHandler
  let userFactory: UserFactory
  let userRepository: UserRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateUserHandler,
        {
          provide: UserFactory,
          useValue: {},
        },
        {
          provide: injectionToken.USER_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile()

    createUserHandler = module.get(CreateUserHandler)
    userFactory = module.get(UserFactory)
    userRepository = module.get(injectionToken.USER_REPOSITORY)
  })

  const username = 'hyojeong'
  const email = 'test@example.com'
  const nickname = 'hyojeong'
  const thumbnail = 'thumbnail'
  const about = 'about'
  const password = 'password'

  describe('excute', () => {
    it('should execute CreateUserCommand', async () => {
      // Given
      const user = { create: jest.fn(), commit: jest.fn() }
      userFactory.create = jest.fn().mockReturnValue(user)
      userRepository.newId = jest.fn().mockResolvedValue('userId')
      userRepository.save = jest.fn().mockResolvedValue(undefined)

      // When
      const command = new CreateUserCommand(username, email, nickname, thumbnail, about, password)

      // Then
      await expect(createUserHandler.execute(command)).resolves.toEqual(undefined)
      expect(userRepository.newId).toBeCalledTimes(2)
      expect(user.create).toBeCalledTimes(1)
      expect(user.create).toBeCalledWith(command.password)
      expect(userRepository.save).toBeCalledTimes(1)
      expect(userRepository.save).toBeCalledWith(user)
      expect(user.commit).toBeCalledTimes(1)
    })
  })
})
