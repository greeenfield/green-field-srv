import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { ForbiddenException, Inject } from '@nestjs/common'

import { InjectionToken } from '#shared/enum/injection-token'

import { ResetPasswordCommand } from '#modules/auth/application/commands/implement/reset-password.command'
import { UserRepository } from '#modules/user/domain/repository'

import { TokenFactory } from '#shared/utils/token/token.factory'
import { AuthTokenRepository } from '#modules/auth/domain/repository'

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordHandler implements ICommandHandler<ResetPasswordCommand, void> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(InjectionToken.AUTH_TOKEN_REPOSITORY) private readonly authTokenRepository: AuthTokenRepository,
    private readonly tokenFactory: TokenFactory,
  ) {}

  async execute(command: ResetPasswordCommand): Promise<void> {
    const { token, newPassword } = command

    const { userId, authTokenId, iat, exp } = await this.tokenFactory
      .create()
      .verify<{ userId: string; authTokenId: string; iat: number; exp: number }>(token)

    const [authToken, user] = await Promise.all([
      this.authTokenRepository.findById(authTokenId),
      this.userRepository.findById(userId),
    ])

    console.log(authToken)

    if (authToken.disabled || exp < Date.now() / 1000) {
      new ForbiddenException('Disabled token')
    }

    user.resetPassword(newPassword)
    authToken.disabled = true
    authToken.updatedAt = new Date()

    await Promise.all([this.userRepository.save(user), this.authTokenRepository.save(authToken)])
  }
}
