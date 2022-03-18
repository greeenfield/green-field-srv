export type SendMailParameter = {
  to: string
  subject: string
  text: string
}

export interface IMailerService {
  sendMail: (params: SendMailParameter) => Promise<void>
}
