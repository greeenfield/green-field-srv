import { Note } from './note'

export interface NoteRepository {
  findAll: () => Promise<Note[]>
  findById: (id: string) => Promise<Note | null>
}
