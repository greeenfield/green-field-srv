import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { UserCreatedEvent } from '#modules/user/domain/events/user-created.event'
import { MailerFactory } from '#shared/utils/mailer/mailer.factory'
import { HtmlTemplateFactory } from '#shared/utils/htmlTemplate/htmlTemplate.factory'
import { TemplateType } from '#shared/utils/htmlTemplate/htmlTemplate.interface'
import { EmailTemplateSubject } from '#shared/enum/emailSubject'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler {
  constructor(
    private readonly mailerFactory: MailerFactory,
    private readonly htmlTemplateFactory: HtmlTemplateFactory,
  ) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { email, username } = event

    const html = await this.htmlTemplateFactory.create(TemplateType.SIGN_UP).html({ username, resetUrl: '' })

    await this.mailerFactory.create().sendMail({ to: email, subject: EmailTemplateSubject[TemplateType.SIGN_UP], html })
  }
}
