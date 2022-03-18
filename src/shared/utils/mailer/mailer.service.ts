import { NodeMailerAdapter } from '#shared/utils/mailer/nodeMailer.adapter'
import { IMailerService } from './mailer.interface'

export class MailerService implements IMailerService {
  constructor(private readonly nodeMailerAdapter: NodeMailerAdapter) {}

  async sendMail({ to, subject, text }): Promise<void> {
    await this.nodeMailerAdapter.send(to, subject, text)
  }
}
