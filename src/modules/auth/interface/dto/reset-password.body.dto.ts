import { IsString } from 'class-validator'

export class ResetPasswordDTO {
  @IsString()
  readonly token: string

  @IsString()
  readonly new_password: string
}
