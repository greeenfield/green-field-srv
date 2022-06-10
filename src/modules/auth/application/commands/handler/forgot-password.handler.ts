import { ICommandHandler, CommandHandler } from '@nestjs/cqrs'
import { ForbiddenException, Inject } from '@nestjs/common'

import { ForgotPasswordCommand } from '#modules/auth/application/commands/implement/forgot-password.command'
import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'
import { UserRepository } from '#modules/user/domain/repository'
import { AuthTokenRepository } from '#modules/auth/domain/repository'

import { configuration } from '#config/configuration'

import { InjectionToken } from '#shared/enum/injection-token'
import { EmailTemplateSubject } from '#shared/enum/emailSubject'
import { Path } from '#shared/enum/path'
import { MailerFactory } from '#shared/utils/mailer/mailer.factory'
import { TokenFactory } from '#shared/utils/token/token.factory'
import { HtmlTemplateFactory } from '#shared/utils/htmlTemplate/htmlTemplate.factory'
import { TemplateType } from '#shared/utils/htmlTemplate/htmlTemplate.interface'
import { Url } from '#shared/utils/snippets/urlGenerator'

@CommandHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements ICommandHandler<ForgotPasswordCommand, void> {
  constructor(
    @Inject(InjectionToken.USER_REPOSITORY) private readonly userRepository: UserRepository,
    @Inject(InjectionToken.AUTH_TOKEN_REPOSITORY) private readonly authTokenRepository: AuthTokenRepository,
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

    const { id: userId, username } = user.properties()

    const authTokenId = await this.authTokenRepository.newId()
    const authToken = new AuthTokenEntity()
    authToken.id = authTokenId
    authToken.userId = userId

    const token = await this.tokenFactory.create().generate({ userId, authTokenId }, { expiresIn: '1h' })

    const html = await this.htmlTemplateFactory.create(TemplateType.FORGOT_PASSWORD).html({
      username,
      resetUrl: new Url(`${configuration().baseUrl}/${Path.AUTH_FORGOT_PASSWORD}`).append({ token }).generate(),
    })

    await Promise.all([
      this.authTokenRepository.save(authToken),
      this.mailerFactory.create().sendMail({
        to: email,
        subject: EmailTemplateSubject.FORGOT_PASSWORD,
        html,
      }),
    ])
  }
}
