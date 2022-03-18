import nodeMailer from 'nodemailer'

export class NodeMailerAdapter {
  constructor(
    private readonly user: string,
    private readonly pass: string,
    private readonly service: string,
    private readonly from: string,
  ) {}

  async send(to: string, subject: string, text: string): Promise<void> {
    const transport = nodeMailer.createTransport({
      service: this.service,
      auth: { user: this.user, pass: this.pass },
    })

    await transport.sendMail({ to, subject, text, from: this.from })
  }
}
