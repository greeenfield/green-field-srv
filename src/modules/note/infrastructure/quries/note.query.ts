import { Raw, createQueryBuilder } from 'typeorm'
import { plainToInstance, ClassConstructor } from 'class-transformer'

import { NoteQuery } from '#modules/note/domain/query'
import { GetNotesResult, Note } from '#modules/note/application/quries/result/get-notes.result'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'

import { addDays } from '#shared/utils/snippets/dateCaculator'

export class NoteQueryImplement implements NoteQuery {
  async findNotes(offset: number, limit: number, timeframe: number): Promise<GetNotesResult> {
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
      .leftJoinAndSelect('note.tags', 'tag')
      .leftJoinAndSelect('note.urlMetas', 'urlMeta')
      .innerJoin('note.user', 'user')
      .innerJoin('user.profile', 'userProfile')
      .offset(offset)
      .take(limit)
      .getMany()

    const converted = notes.map((note) => {
      return {
        ...note,
        user: {
          id: note.user.id,
          username: note.user.username,
          thumbnail: note.user.profile.thumbnail,
        },
        tags: note.tags.map((tag) => tag.name),
      }
    })

    return plainToInstance(Note, converted, { strategy: 'excludeAll' })
  }

  private entityToResult<T>(entity: NoteEntity, classConstructor: ClassConstructor<T>): T {
    return plainToInstance(classConstructor, entity, { strategy: 'excludeAll' })
  }

  private entitiesToResult<T>(entities: NoteEntity[], classConstructor: ClassConstructor<T>): T[] {
    return plainToInstance(classConstructor, entities, { strategy: 'excludeAll' })
  }
}
