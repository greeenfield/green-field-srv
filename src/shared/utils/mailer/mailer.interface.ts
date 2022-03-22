export type SendMailParameter = {
  to: string
  subject: string
  html: string
}

export interface IMailerService {
  sendMail: (params: SendMailParameter) => Promise<void>
}
