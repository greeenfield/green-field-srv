import { getRepository } from 'typeorm'
import { NoteRepository } from '#modules/note/domain/repository'
import { NoteEntity } from '../entities/note.entity'

export class NoteRepositoryImplement implements NoteRepository {
  async newId(): Promise<string> {
    const note = await getRepository(NoteEntity).save(new NoteEntity())
    return note.id
  }
}
