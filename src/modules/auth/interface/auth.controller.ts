import { Request, Response } from 'express'
import { Req, Controller, Post, UseGuards, Res } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { LocalGuard } from '#modules/auth/local.guard'
import { LogoutCommand } from '../application/commands/implement/logout.command'

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request): Promise<string> {
    return req.sessionID
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.commandBus.execute(new LogoutCommand(req, res))
  }
}
