import { Note } from '#modules/note/domain/note'
import { Tag } from '#modules/note/domain/tag'
import { UrlMeta } from '#modules/note/domain/urlMeta'

export interface NoteRepository {
  newId: () => Promise<string>
  findById: (id: string) => Promise<Note | null>
  save: (note: Note) => Promise<void>
  saveUrlMeta: (urlMeta: UrlMeta) => Promise<UrlMeta>
  saveUrlMetas: (urlMetas: UrlMeta[]) => Promise<UrlMeta[]>
  findOrCreateTag: (tagName: string) => Promise<Tag>
  findOrCreateTags: (tagNameList: string[]) => Promise<Tag[]>
  removeById: (id: string) => Promise<void>
}
