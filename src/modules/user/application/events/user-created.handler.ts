import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

import { UserCreatedEvent } from '#modules/user/domain/events/user-created.event'
import { MailerFactory } from '#shared/utils/mailer/mailer.factory'

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler {
  constructor(private readonly mailerFactory: MailerFactory) {}

  async handle(event: UserCreatedEvent): Promise<void> {
    const { email, username } = event

    const mailer = this.mailerFactory.create()

    await mailer.sendMail({ to: email, subject: 'Welcome', text: `Hi, ${username}` })
  }
}
