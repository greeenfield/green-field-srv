import { ICommand } from '@nestjs/cqrs'

export class UploadImageCommand implements ICommand {
  constructor(readonly file) {}
}
