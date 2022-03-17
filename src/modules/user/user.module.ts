import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { injectionToken } from '#shared/injection-token'

import { UserRepositoryImplement } from '#modules/user/infrastructure/repositories/user.repository'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UserProfileEntity } from '#modules/user/infrastructure/entities/profile.entity'

import { CreateUserHandler } from '#modules/user/application/commands/handler/create-user.handler'

import { UserFactory } from '#modules/user/domain/factory'

import { UserController } from '#modules/user/interface/user.controller'

const infrastructure: Provider[] = [
  {
    provide: injectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
]

const application = [CreateUserHandler]

const domain: Provider[] = [UserFactory]

@Module({
  imports: [CqrsModule, ConfigService, TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [...infrastructure, ...application, ...domain],
})
export class UserModule {}
