export enum TemplateType {
  SIGN_UP = 'sign-up',
  FORGOT_PASSWORD = 'forgot_password',
}

export type SignUpTemplateVariables = {
  username: string
}

export type ForgotPasswordTemplateVariables = {
  username: string
  resetUrl: string
}

export interface IHtmlTemplateService {
  html: (variables: { [k: string]: string }) => Promise<string>
}
