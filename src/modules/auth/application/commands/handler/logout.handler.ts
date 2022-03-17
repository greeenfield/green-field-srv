import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'

import { LogoutCommand } from '#modules/auth/application/commands/implement/logout.command'

@CommandHandler(LogoutCommand)
export class LoginHandler implements ICommandHandler<LogoutCommand, void> {
  async execute(command: LogoutCommand): Promise<void> {
    const { request, response } = command

    request.logOut()
    request.session.destroy((error) => {
      if (error) {
        throw new Error(error)
      }
      response.clearCookie('connect.sid')
    })
  }
}
