import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { CreateNoteHandler } from '#modules/note/application/commands/handler/create-note.handler'
import { InjectionToken } from '#modules/note/application/injection.token'

import { NoteFactory } from '#modules/note/domain/factory'

import { NoteController } from '#modules/note/interface/note.controller'

import { NoteRepositoryImplement } from '#modules/note/infrastructure/repositories/note.repository'
// import { BaseDate } from '#modules/note/infrastructure/entities/baseDate.entity'
import { Note } from '#modules/note/infrastructure/entities/note.entity'
import { NoteMeta } from '#modules/note/infrastructure/entities/noteMeta.entity'
import { Tag } from '#modules/note/infrastructure/entities/tag.entity'

// const infrastructure: Provider[] = [
//   {
//     provide: InjectionToken.NOTE_REPOSITORY,
//     useClass: NoteRepositoryImplement,
//   },
// ]

// const application = [CreateNoteHandler]

// const domain = [NoteFactory]

// ...infrastructure, ...application, ...domain
@Module({
  imports: [CqrsModule, ConfigService, TypeOrmModule.forFeature([Note, NoteMeta, Tag])],
  exports: [TypeOrmModule],
  controllers: [NoteController],
  providers: [],
})
export class NoteModule {}
