import { Note } from './note'

export interface NoteRepository {
  generateId: () => string
  findAll: () => Promise<Note[]>
  findById: (id: string) => Promise<Note | null>
  save: (note: Note) => Promise<void>
}
