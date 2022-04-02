import { IsEmail } from 'class-validator'

export class ForgotPasswordDTO {
  @IsEmail()
  readonly email: string
}
