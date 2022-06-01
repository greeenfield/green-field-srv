import { IsString, IsEmail, MaxLength, MinLength, IsOptional } from 'class-validator'

export class CreateUserDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly username: string

  @IsEmail()
  readonly email: string

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  readonly nickname: string

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  readonly password: string

  @IsString()
  @IsOptional()
  readonly thumbnail: string

  @IsString()
  @MinLength(0)
  @MaxLength(200)
  @IsOptional()
  readonly about: string
}
