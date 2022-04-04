import { Note } from './note'

export interface NoteRepository {
  newId: () => Promise<string>
  // findAll: () => Promise<Note[]>
  // findById: (id: string) => Promise<Note | null>
  // save: (note: Note) => Promise<void>
}
