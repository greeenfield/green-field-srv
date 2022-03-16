import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LoginHandler } from './application/commands/handler/login.handler'
import { AuthController } from './interface/auth.controller'
import { LocalStrategy } from './local.strategy'
import { AuthSerializer } from './serialization.provider'

const application = [LoginHandler]

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthSerializer, ...application],
})
export class AuthModule {}
