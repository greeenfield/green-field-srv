import { GetNotesResult } from '#modules/note/application/quries/result/get-notes.result'

export interface NoteQuery {
  findNotes: (offset: number, limit: number, timeframe: number) => Promise<GetNotesResult>
}
