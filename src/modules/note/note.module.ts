import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@nestjs/config'

import { CreateNoteHandler } from './application/commands/handler/create-note.handler'
import { NoteFactory } from './domain/factory'
import { NoteController } from './interface/note.controller'
import { NoteRepositoryImplement } from './infrastructure/repositories/note.repository'
import { InjectionToken } from './application/injection.token'

const infrastructure: Provider[] = [
  {
    provide: InjectionToken.NOTE_REPOSITORY,
    useClass: NoteRepositoryImplement,
  },
]

const application = [CreateNoteHandler]

const domain = [NoteFactory]

@Module({
  imports: [CqrsModule, ConfigService],
  exports: [TypeOrmModule],
  controllers: [NoteController],
  providers: [...infrastructure, ...application, ...domain],
})
export class NoteModule {}
