import { Req, Body, Controller, Post, UseGuards } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'

import { LoginDTO } from '#modules/auth/interface/dto/login.body.dto'
import { LocalGuard } from '#modules/auth/local.guard'

@Controller('auth')
export class AuthController {
  constructor(readonly commandBus: CommandBus, readonly queryBus: QueryBus) {}

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req, @Body() body: LoginDTO): Promise<void> {
    return req.session
  }
}
