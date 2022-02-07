import { Module } from '@nestjs/common'
import { NoteController } from './note.controller'
import { NoteService } from './note.service'
import { NoteQueryRepository } from './note.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Note } from '../../entity/note.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Note, NoteQueryRepository])],
  exports: [TypeOrmModule],
  controllers: [NoteController],
  providers: [NoteService, NoteQueryRepository],
})
export class NoteModule {}
