import { NoteRepository } from '#app/notes/domain/repository'
import { Note } from '#app/notes/domain/note'

export class NoteRepositoryImplement implements NoteRepository {
  async findById(id: string): Promise<Note> {
    return
  }

  generateId
  findAll
  save
}
