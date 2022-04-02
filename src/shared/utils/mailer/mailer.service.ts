import { NodeMailerAdapter } from '#shared/utils/mailer/nodeMailer.adapter'
import { IMailerService } from '#shared/utils/mailer/mailer.interface'

export class MailerService implements IMailerService {
  constructor(private readonly nodeMailerAdapter: NodeMailerAdapter) {}

  async sendMail({ to, subject, html }): Promise<void> {
    await this.nodeMailerAdapter.send(to, subject, html)
  }
}
