import { ICommand } from '@nestjs/cqrs'

export class CreateUserCommand implements ICommand {
  constructor(
    readonly username: string,
    readonly email: string,
    readonly nickname: string,
    readonly thumbnail: string,
    readonly about: string,
    readonly password: string,
  ) {}
}
