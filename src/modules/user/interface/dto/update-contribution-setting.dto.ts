import { IsBoolean } from 'class-validator'
import { Expose } from 'class-transformer'

export class UpdateContributionSettingDTO {
  @IsBoolean()
  @Expose({ name: 'private_contribution' })
  readonly privateContribution: boolean
}
