import { ICommand } from '@nestjs/cqrs'
import { Request, Response } from 'express'

export class LogoutCommand implements ICommand {
  constructor(readonly request: Request, readonly response: Response) {}
}
