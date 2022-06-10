import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { ForbiddenException, Inject } from '@nestjs/common'

import { InjectionToken } from '#shared/enum/injection-token'

import { LoginCommand } from '#modules/auth/application/commands/implement/login.command'
import { UserRepository } from '#modules/user/domain/repository'

import { User } from '#modules/user/domain/user'

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand, User> {
  constructor(@Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository) {}

  async execute(command: LoginCommand): Promise<User> {
    const { email, password } = command

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ForbiddenException('이메일 또는 비밀번호를 확인해주세요.')
    }

    if (!user.comparePassword(password)) {
      throw new ForbiddenException('이메일 또는 비밀번호를 확인해주세요.')
    }

    return user
  }
}
