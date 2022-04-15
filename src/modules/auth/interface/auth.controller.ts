import { Request, Response } from 'express'
import { Req, Controller, Post, UseGuards, Res, Put, Body } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { ForgotPasswordDTO } from '#modules/auth/interface/dto/forgot-password.body.dto'
import { ResetPasswordDTO } from '#modules/auth/interface/dto/reset-password.body.dto'

import { LocalGuard } from '#modules/auth/local.guard'

import { LogoutCommand } from '#modules/auth/application/commands/implement/logout.command'
import { ForgotPasswordCommand } from '#modules/auth/application/commands/implement/forgot-password.command'
import { ResetPasswordCommand } from '#modules/auth/application/commands/implement/reset-password.command'

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
    return this.commandBus.execute(new LogoutCommand(req, res))
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDTO): Promise<void> {
    await this.commandBus.execute(new ForgotPasswordCommand(body.email))
  }

  @Put('reset-password')
  async resetPassword(@Body() body: ResetPasswordDTO): Promise<void> {
    await this.commandBus.execute(new ResetPasswordCommand(body.token, body.new_password))
  }
}
