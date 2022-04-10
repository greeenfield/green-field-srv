import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'

@Entity({ name: 'url_meta' })
export class UrlMetaEntity extends BaseEntity {
  @ManyToOne(() => NoteEntity, (note) => note.urlMetas)
  @JoinColumn({ name: 'note_id' })
  note: NoteEntity

  @Column({ type: 'uuid', nullable: true })
  noteId: string

  @Column({ length: 255 })
  url: string

  @Column({ length: 255, nullable: true })
  thumbnail: string

  @Column({ length: 255 })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string
}
