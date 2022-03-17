import { Req, Controller, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { LocalGuard } from '#modules/auth/local.guard'

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req): Promise<void> {
    return req.session
  }
}
