import { Request, Response } from 'express'
import { Req, Controller, Post, UseGuards, Res, Put, Body } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { ForgotPasswordDTO } from './dto/forgot-password.body.dto'

import { LocalGuard } from '#modules/auth/local.guard'

import { LogoutCommand } from '#modules/auth/application/commands/implement/logout.command'
import { ForgotPasswordCommand } from '#modules/auth/application/commands/implement/forgot-password.command'

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

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO): Promise<void> {
    await this.commandBus.execute(new ForgotPasswordCommand(body.email))
  }
}
