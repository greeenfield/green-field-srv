import { ICommand } from '@nestjs/cqrs'

export class ResetPasswordCommand implements ICommand {
  constructor(readonly token: string, readonly newPassword: string) {}
}
