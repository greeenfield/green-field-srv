import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {
  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string
}
