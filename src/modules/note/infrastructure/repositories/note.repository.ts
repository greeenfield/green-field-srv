import { Inject } from '@nestjs/common'
import { getRepository } from 'typeorm'
import { plainToInstance } from 'class-transformer'

import { NoteRepository } from '#modules/note/domain/repository'
import { NoteFactory } from '#modules/note/domain/factory'
import { Note } from '#modules/note/domain/note'
import { Tag } from '#modules/note/domain/tag'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'
import { UrlMetaEntity } from '#modules/note/infrastructure/entities/urlMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

export class NoteRepositoryImplement implements NoteRepository {
  constructor(@Inject(NoteFactory) private readonly noteFactory: NoteFactory) {}

  async newId(): Promise<string> {
    const note = await getRepository(NoteEntity).save(new NoteEntity())
    return note.id
  }

  async save(note: Note): Promise<void> {
    const urlMetaEntities = plainToInstance(UrlMetaEntity, note.properties().urlMetas)

    const noteEntity = this.modelToEntity(note)
    noteEntity.urlMetas = urlMetaEntities

    await Promise.all([getRepository(NoteEntity).save(noteEntity), getRepository(UrlMetaEntity).save(urlMetaEntities)])
  }

  async findById(id: string): Promise<Note | null> {
    const noteEntity = await getRepository(NoteEntity).findOne({
      relations: ['tags'],
      where: { id: id },
    })

    const urlMetaEntities = await getRepository(UrlMetaEntity).find({
      relations: ['note'],
      where: { noteId: id },
    })

    noteEntity.urlMetas = urlMetaEntities

    return this.entityToModel(noteEntity)
  }

  async findOrCreateTags(tagNames: string[]): Promise<Tag[]> {
    return await Promise.all(tagNames.map((name) => this.findOrCreateTag(name)))
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

  private entityToModel(entity: NoteEntity): Note {
    return this.noteFactory.reconstitute(entity)
  }
}
