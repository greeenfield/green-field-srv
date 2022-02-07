import { EntityRepository, Repository, createQueryBuilder } from 'typeorm'

import { Note } from '../../entity/note.entity'

@EntityRepository(Note)
export class NoteQueryRepository extends Repository<Note> {
  async findAll(): Promise<Note[]> {
    return await createQueryBuilder(Note, 'note')
      .where('note.isPrivate = false')
      .andWhere('note.isTemp = false')
      .getMany()
  }
}
