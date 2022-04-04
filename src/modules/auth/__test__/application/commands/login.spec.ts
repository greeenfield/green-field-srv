import { Test } from '@nestjs/testing'
import { ForbiddenException } from '@nestjs/common'

import { injectionToken } from 'src/shared/enum/injection-token'

import { UserRepository } from 'src/modules/user/domain/repository'
import { LoginHandler } from '#modules/auth/application/commands/handler/login.handler'
import { LoginCommand } from '#modules/auth/application/commands/implement/login.command'

describe('LoginHandler', () => {
  let loginHandler: LoginHandler
  let userRepository: UserRepository

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        LoginHandler,
        {
          provide: injectionToken.USER_REPOSITORY,
          useValue: {},
        },
      ],
    }).compile()

    loginHandler = module.get(LoginHandler)
    userRepository = module.get(injectionToken.USER_REPOSITORY)
  })

  const email = 'test@example.com'
  const password = 'password'

  describe('excute', () => {
    it('should throw ForbiddenException when password is incorrect', async () => {
      // Given
      const user = { comparePassword: jest.fn() }
      userRepository.findByEmail = jest.fn().mockResolvedValue(user)

      // When
      const command = new LoginCommand(email, password)

      // Then
      await expect(loginHandler.execute(command)).rejects.toThrowError(ForbiddenException)
      expect(userRepository.findByEmail).toBeCalledTimes(1)
      expect(user.comparePassword).toBeCalledTimes(1)
    })
  })
})
