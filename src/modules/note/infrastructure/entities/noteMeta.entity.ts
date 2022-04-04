import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { NoteEntity } from '#modules/note/infrastructure/entities/note.entity'

@Entity({ name: 'note_meta' })
export class NoteMetaEntity extends BaseEntity {
  @OneToOne(() => NoteEntity, (note) => note.noteMetas)
  @JoinColumn()
  note: NoteEntity

  @Column({ length: 255 })
  url: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column({ length: 255 })
  title: string

  @Column('text')
  description: string
}
