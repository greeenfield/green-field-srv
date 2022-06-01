import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserRepositoryImplement } from '#modules/user/infrastructure/repositories/user.repository'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UserProfileEntity } from '#modules/user/infrastructure/entities/profile.entity'
import { UserFactory } from '#modules/user/domain/factory'
import { UserController } from '#modules/user/interface/user.controller'

import { CreateUserHandler } from '#modules/user/application/commands/handler/create-user.handler'
import { UpdateContributionSettingHandler } from '#modules/user/application/commands/handler/update-contribution-setting.handler'
import { UserCreatedHandler } from '#modules/user/application/events/user-created.handler'
import { GetMeHandler } from '#modules/user/application/commands/handler/get-me.handler'

import { HtmlTemplateFactory } from '#shared/utils/htmlTemplate/htmlTemplate.factory'
import { InjectionToken } from '#shared/enum/injection-token'
import { MailerFactory } from '#shared/utils/mailer/mailer.factory'

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
]

const application = [CreateUserHandler, UserCreatedHandler, UpdateContributionSettingHandler, GetMeHandler]

const domain: Provider[] = [UserFactory, MailerFactory, HtmlTemplateFactory]

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([UserEntity, UserProfileEntity])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [...infrastructure, ...application, ...domain],
})
export class UserModule {}
