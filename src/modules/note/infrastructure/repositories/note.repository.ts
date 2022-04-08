import { getRepository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { NoteRepository } from '#modules/note/domain/repository'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'
import { Note } from '#modules/note/domain/note'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'
import { Tag } from '#modules/note/domain/tag'

export class NoteRepositoryImplement implements NoteRepository {
  async newId(): Promise<string> {
    const note = await getRepository(NoteEntity).save(new NoteEntity())
    return note.id
  }

  async save(note: Note): Promise<void> {
    await getRepository(NoteEntity).save(this.modelToEntity(note))
  }

  async findOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    return await Promise.all(tagNames.map((name) => getRepository(TagEntity).findOne({ where: { name } })))
  }

  async findOrCreateTag(tagName: string): Promise<Tag> {
    const tag = await getRepository(TagEntity).findOne({ name: tagName })

    if (tag) return tag

    const newTag = await getRepository(TagEntity).save(TagEntity.build(tagName))

    return newTag
  }

  private modelToEntity(model: Note): NoteEntity {
    return plainToInstance(NoteEntity, model.properties())
  }
}
