import { ICommand } from '@nestjs/cqrs'

export class CreateUserCommand implements ICommand {
  constructor(readonly username, readonly nickname, readonly email) {}
}
