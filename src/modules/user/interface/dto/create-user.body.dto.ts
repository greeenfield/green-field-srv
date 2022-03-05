import { IsString, IsEmail, MaxLength, MinLength } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(12)
  readonly username: string

  @IsString()
  @MinLength(1)
  @MaxLength(12)
  readonly nickname: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string
}
