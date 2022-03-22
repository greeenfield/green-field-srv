export enum TemplateType {
  SIGN_UP = 'sign-up',
  RESET_PASSWORD = 'reset-password',
}

type SignUpTemplateVariables = {
  username: string
}

type ResetPasswordTemplateVariables = {
  username: string
  resetUrl: string
}

export type TemplateVariables = SignUpTemplateVariables | ResetPasswordTemplateVariables

export interface IHtmlTemplateService {
  html: (variables: TemplateVariables) => Promise<string>
}
