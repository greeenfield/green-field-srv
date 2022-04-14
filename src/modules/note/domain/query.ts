import { GetNotesResult } from '#modules/note/application/quries/result/get-notes.result'
import { GetContributionsResult } from '#modules/note/application/quries/result/get-contributions.result'

export interface NoteQuery {
  findNotes: (offset: number, limit: number, timeframe: number) => Promise<GetNotesResult>
  findContributions: (userId: string, beginDate: string, endDate: string) => Promise<GetContributionsResult>
}
