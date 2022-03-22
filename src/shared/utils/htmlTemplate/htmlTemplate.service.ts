import * as mustache from 'mustache'
import * as path from 'path'
import * as fs from 'fs/promises'

import {
  ForgotPasswordTemplateVariables,
  IHtmlTemplateService,
  SignUpTemplateVariables,
} from '#shared/utils/htmlTemplate/htmlTemplate.interface'

class HtmlTemplateService {
  protected async getRenderTemplate(filePath: string, variables): Promise<string> {
    const htmlTemplate = await fs.readFile(path.join(__dirname, `/public/${filePath}.template.mustache`))

    return mustache.render(htmlTemplate.toString(), variables)
  }
}

export class SignUpTemplateService extends HtmlTemplateService implements IHtmlTemplateService {
  async html(variables: SignUpTemplateVariables): Promise<string> {
    return await this.getRenderTemplate('sign-up', variables)
  }
}

export class ForgotPasswordTemplateService extends HtmlTemplateService implements IHtmlTemplateService {
  async html(variables: ForgotPasswordTemplateVariables): Promise<string> {
    return await this.getRenderTemplate('forgot-password', variables)
  }
}
