import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { CreateNoteHandler } from '#modules/note/application/commands/handler/create-note.handler'
import { InjectionToken } from '#modules/note/application/injection.token'

import { NoteFactory } from '#modules/note/domain/factory'

import { NoteController } from '#modules/note/interface/note.controller'

import { NoteRepositoryImplement } from '#modules/note/infrastructure/repositories/note.repository'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'
import { NoteMetaEntity } from '#modules/note/infrastructure/entities/noteMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.NOTE_REPOSITORY,
    useClass: NoteRepositoryImplement,
  },
]

const application = [CreateNoteHandler]

const domain = [NoteFactory]

@Module({
  imports: [CqrsModule, ConfigService, TypeOrmModule.forFeature([NoteEntity, NoteMetaEntity, TagEntity])],
  exports: [TypeOrmModule],
  controllers: [NoteController],
  providers: [...infrastructure, ...application, ...domain],
})
export class NoteModule {}
