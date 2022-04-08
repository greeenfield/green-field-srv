import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { CreateNoteHandler } from '#modules/note/application/commands/handler/create-note.handler'

import { NoteFactory } from '#modules/note/domain/factory'
import { UserFactory } from '#modules/user/domain/factory'

import { NoteController } from '#modules/note/interface/note.controller'

import { NoteRepositoryImplement } from '#modules/note/infrastructure/repositories/note.repository'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'
import { UrlMetaEntity } from '#modules/note/infrastructure/entities/urlMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'
import { UserRepositoryImplement } from '#modules/user/infrastructure/repositories/user.repository'

import { InjectionToken } from '#shared/enum/injection-token'

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.NOTE_REPOSITORY,
    useClass: NoteRepositoryImplement,
  },
  {
    provide: InjectionToken.USER_REPOSITORY,
    useClass: UserRepositoryImplement,
  },
]

const application = [CreateNoteHandler]

const domain = [NoteFactory, UserFactory]

@Module({
  imports: [CqrsModule, ConfigService, TypeOrmModule.forFeature([NoteEntity, UrlMetaEntity, TagEntity])],
  exports: [TypeOrmModule],
  controllers: [NoteController],
  providers: [...infrastructure, ...application, ...domain],
})
export class NoteModule {}
