import { Test } from '@nestjs/testing'
import { instance, mock } from 'ts-mockito'

import { LogoutHandler } from '#modules/auth/application/commands/handler/logout.handler'
import { LogoutCommand } from '#modules/auth/application/commands/implement/logout.command'
import { Request, Response } from 'express'

describe('LogoutHandler', () => {
  let logoutHandler: LogoutHandler

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [LogoutHandler],
    }).compile()

    logoutHandler = module.get(LogoutHandler)
  })

  describe('excute', () => {
    it('should excute LogoutHandler', async () => {
      // Given
      const req = instance(mock<Request>())
      const res = instance(mock<Response>())

      // When
      const command = new LogoutCommand(req, res)

      // Then
      await expect(logoutHandler.execute(command)).resolves.toEqual(undefined)
      expect(req.logOut).toBeCalledTimes(1)
      expect(req.session.destroy).toBeCalledTimes(1)
      expect(res.clearCookie).toBeCalledTimes(1)
      expect(res.clearCookie).toBeCalledWith('connect.sid')
    })
  })
})
