import { ICommand } from '@nestjs/cqrs'

export class ForgotPasswordCommand implements ICommand {
  constructor(readonly email: string) {}
}
