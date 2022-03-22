import { SignUpTemplateService, ResetPasswordTemplateService } from '#shared/utils/htmlTemplate/htmlTemplate.service'
import { TemplateType } from '#shared/utils/htmlTemplate/htmlTemplate.interface'

export class HtmlTemplateFactory {
  create(templateType: TemplateType) {
    const templateServiceMap = {
      [TemplateType.SIGN_UP]: new SignUpTemplateService(),
      [TemplateType.RESET_PASSWORD]: new ResetPasswordTemplateService(),
    }

    return templateServiceMap[templateType]
  }
}
