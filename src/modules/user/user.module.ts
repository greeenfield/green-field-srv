import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { injectionToken } from '#shared/injection-token'
import { UserRepositoryImplement } from '#modules/user/infrastructure/repositories/user.repository'
import { UserController } from '#modules/user/interface/user.controller'

const infrastructure: Provider[] = [
  {
    provide: injectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
]

const application: Provider[] = []

const domain: Provider[] = []

@Module({
  imports: [CqrsModule, ConfigService],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [...infrastructure, ...application, ...domain],
})
export class UserModule {}
