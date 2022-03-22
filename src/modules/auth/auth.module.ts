import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'

import { injectionToken } from '#shared/injection-token'

import { UserRepositoryImplement } from '#modules/user/infrastructure/repositories/user.repository'
import { UserFactory } from '#modules/user/domain/factory'

import { LoginHandler } from '#modules/auth/application/commands/handler/login.handler'
import { LogoutHandler } from '#modules/auth/application/commands/handler/logout.handler'
import { AuthController } from '#modules/auth/interface/auth.controller'
import { AuthTokenRepositoryImplement } from '#modules/auth/infrastructure/repositories/authToken.repository'
import { LocalStrategy } from '#modules/auth/local.strategy'
import { AuthSerializer } from '#modules/auth/serialization.provider'

import { MailerFactory } from '#shared/utils/mailer/mailer.factory'

const infrastructure: Provider[] = [
  {
    provide: injectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
  {
    provide: injectionToken.AUTH_TOKEN_REPOSITORY,
    useClass: AuthTokenRepositoryImplement,
  },
]

const application = [LoginHandler, LogoutHandler]

const domain: Provider[] = [UserFactory, MailerFactory]

@Module({
  imports: [CqrsModule, PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [LocalStrategy, AuthSerializer, ...infrastructure, ...application, ...domain],
})
export class AuthModule {}
