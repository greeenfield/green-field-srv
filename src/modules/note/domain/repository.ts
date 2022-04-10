import { Note } from '#modules/note/domain/note'
import { Tag } from '#modules/note/domain/tag'

export interface NoteRepository {
  newId: () => Promise<string>
  findById: (id: string) => Promise<Note | null>
  save: (note: Note) => Promise<void>
  findOrCreateTag: (tagName: string) => Promise<Tag>
  findOrCreateTags: (tagNameList: string[]) => Promise<Tag[]>
}
