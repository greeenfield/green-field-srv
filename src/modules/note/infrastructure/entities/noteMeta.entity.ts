import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { Note } from '#modules/note/infrastructure/entities/note.entity'

@Entity()
export class NoteMeta extends BaseEntity {
  @OneToOne(() => Note, (note) => note.noteMetas)
  @JoinColumn()
  note: Note

  @Column({ length: 255 })
  url: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column({ length: 255 })
  title: string

  @Column('text')
  description: string
}
