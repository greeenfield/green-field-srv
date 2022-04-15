import { Inject } from '@nestjs/common'
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs'

import { NoteQuery } from '#modules/note/domain/query'
import { GetNotesQuery } from '#modules/note/application/quries/implement/get-notes.query'
import { GetNotesResult } from '#modules/note/application/quries/result/get-notes.result'

import { InjectionToken } from '#shared/enum/injection-token'

@QueryHandler(GetNotesQuery)
export class GetNotesHandler implements IQueryHandler<GetNotesQuery, GetNotesResult> {
  constructor(@Inject(InjectionToken.NOTE_QUERY_REPOSITORY) private readonly noteQuery: NoteQuery) {}

  async execute(query: GetNotesQuery): Promise<GetNotesResult> {
    const { offset, limit, timeframe } = query
    const notes = await this.noteQuery.findNotes(offset, limit, timeframe)

    return notes
  }
}
