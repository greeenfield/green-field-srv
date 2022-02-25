import { NoteRepository } from '#modules/note/domain/repository'
import { Note } from '#modules/note/domain/note'

export class NoteRepositoryImplement implements NoteRepository {
  async findById(id: string): Promise<Note> {
    return
  }

  generateId
  findAll
  save
}
