import { configuration } from '#config/configuration'

import { NodeMailerAdapter } from '#shared/utils/mailer/nodeMailer.adapter'
import { MailerService } from '#shared/utils/mailer/mailer.service'
import { IMailerService } from '#shared/utils/mailer/mailer.interface'

export class MailerFactory {
  create(): IMailerService {
    const { user, pass, service, from } = configuration().nodeMailerConfig

    return new MailerService(new NodeMailerAdapter(user, pass, service, from))
  }
}
