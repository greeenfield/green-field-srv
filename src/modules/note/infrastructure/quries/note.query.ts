import { Raw, createQueryBuilder } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { NoteQuery } from '#modules/note/domain/query'
import { Note, Notes } from '#modules/note/application/quries/result/get-notes.result'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'

import { addDays } from '#shared/utils/snippets/dateCaculator'

export class NoteQueryImplement implements NoteQuery {
  async findNotes(offset: number, limit: number, timeframe: number): Promise<any> {
    const notes = await createQueryBuilder(NoteEntity, 'note')
      .where({ isPrivate: false })
      .andWhere({ isTemp: false })
      .andWhere({ releasedAt: Raw((releasedAt) => `${releasedAt} > :date`, { date: addDays(new Date(), timeframe) }) })
      .select([
        'note.id',
        'note.title',
        'note.likes',
        'note.thumbnail',
        'note.updatedAt',
        'tag.name',
        'urlMeta.thumbnail',
        'urlMeta.url',
        'urlMeta.title',
        'urlMeta.description',
        'user.id',
        'user.username',
        'userProfile.thumbnail',
      ])
      .innerJoinAndSelect('note.tags', 'tag')
      .leftJoinAndSelect('note.urlMetas', 'urlMeta')
      .leftJoin('note.user', 'user')
      .leftJoin('user.profile', 'userProfile')
      .offset(offset)
      .take(limit)
      .getMany()

    return notes
  }
}
