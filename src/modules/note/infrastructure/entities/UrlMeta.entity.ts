import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'

@Entity({ name: 'url_meta' })
export class UrlMetaEntity extends BaseEntity {
  @ManyToOne(() => NoteEntity, (note) => note.urlMetas)
  @JoinColumn({ name: 'noteId' })
  note: NoteEntity

  @Column('uuid')
  noteId: string

  @Column({ length: 255 })
  url: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column({ length: 255 })
  title: string

  @Column('text')
  description: string
}
