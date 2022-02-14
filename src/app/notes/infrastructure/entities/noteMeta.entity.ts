import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseDate } from './baseDate.entity'
import { Note } from './note.entity'

@Entity()
export class NoteMeta extends BaseDate {
  @OneToOne(() => Note, (note) => note.noteMeta)
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
