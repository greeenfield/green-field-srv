import { IsString } from 'class-validator'
import { Expose } from 'class-transformer'

export class GetContributionsDTO {
  @Expose({ name: 'user_id' })
  @IsString()
  userId: string

  @Expose({ name: 'begin_date' })
  @IsString()
  beginDate: string

  @Expose({ name: 'end_date' })
  @IsString()
  endDate: string
}
