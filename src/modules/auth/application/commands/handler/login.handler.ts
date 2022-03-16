import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common'

import { injectionToken } from '#shared/injection-token'

import { LoginCommand } from '#modules/auth/application/commands/implement/login.command'
import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, void> {
  constructor(
    private readonly userFactory: UserFactory,
    @Inject(injectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async execute(command: LoginCommand): Promise<void> {
    const { email, password } = command

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      console.log('!user')
    }

    if (!user.comparePassword(password)) {
      console.log('!user.comparePassword(password)')
    }
  }
}
