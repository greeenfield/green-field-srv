import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { ForbiddenException, Inject } from '@nestjs/common'

import { injectionToken } from '#shared/injection-token'
import { MailerFactory } from '#shared/utils/mailer/mailer.factory'

import { ForgotPasswordCommand } from '#modules/auth/application/commands/implement/forgot-password.command'
import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'
import { UserRepository } from '#modules/user/domain/repository'
import { AuthTokenRepository } from '#modules/auth/domain/repository'

import { TokenFactory } from '#shared/utils/token/token.factory'
import { HtmlTemplateFactory } from '#shared/utils/htmlTemplate/htmlTemplate.factory'
import { TemplateType } from '#shared/utils/htmlTemplate/htmlTemplate.interface'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand, void> {
  constructor(
    @Inject(injectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(injectionToken.AUTH_TOKEN_REPOSITORY) private readonly authTokenRepository: AuthTokenRepository,
    private readonly mailerFactory: MailerFactory,
    private readonly tokenFactory: TokenFactory,
    private readonly htmlTemplateFactory: HtmlTemplateFactory,
  ) {}

  async execute(command: ForgotPasswordCommand): Promise<void> {
    const { email } = command

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new ForbiddenException('Incorrect email.')
    }

    const authToken = new AuthTokenEntity()
    authToken.userId = user.properties().id

    const token = await this.tokenFactory
      .create()
      .generate({ userId: user.properties().id, tokenId: authToken.id }, { expiresIn: '1h' })

    const html = await this.htmlTemplateFactory.create(TemplateType.RESET_PASSWORD).html({
      username: user.properties().username,
      resetUrl: `http://localhost:3000/auth/reset-password?token=${token}`,
    })

    await Promise.all([
      this.authTokenRepository.save(authToken),
      this.mailerFactory.create().sendMail({
        to: email,
        subject: 'Forget Password Email',
        html,
      }),
    ])
  }
}
