import { IsString } from 'class-validator'
import { Expose, Exclude, Type } from 'class-transformer'

class Profile {
  @Exclude({ toPlainOnly: true })
  readonly id: string

  @Exclude({ toPlainOnly: true })
  readonly userId: string

  @Expose()
  readonly nickname: string

  @Expose()
  readonly thumbnail: string

  @Expose()
  readonly about: string

  @Exclude({ toPlainOnly: true })
  readonly createdAt: Date

  @Exclude({ toPlainOnly: true })
  readonly updatedAt: Date
}

export class GetMeResponseDTO {
  @Expose()
  readonly id: string

  @Expose()
  readonly email: string

  @Expose()
  readonly username: string

  @Expose()
  @Type(() => Profile)
  readonly profile: Profile

  @Exclude({ toPlainOnly: true })
  readonly updatedAt: Date

  @Exclude({ toPlainOnly: true })
  readonly createdAt: Date

  @Exclude({ toPlainOnly: true })
  readonly password: string
}
