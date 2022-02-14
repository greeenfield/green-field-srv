import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import { BaseDate } from './baseDate.entity'
import { User } from './user.entity'
import { NoteMeta } from './noteMeta.entity'
import { Tag } from './tag.entity'

@Entity()
export class Note extends BaseDate {
  @OneToOne(() => User)
  @JoinColumn()
  user: User

  @OneToMany(() => NoteMeta, (noteMeta) => noteMeta.note)
  @JoinColumn()
  noteMetas: NoteMeta[]

  @Column({ length: 255 })
  title: string

  @Column('text')
  body: string

  @ManyToMany(() => Tag)
  @JoinTable({
    name: 'note_tags',
    joinColumn: {
      name: 'note',
    },
    inverseJoinColumn: {
      name: 'tag',
    },
  })
  tags: Tag[]

  @Column()
  isTemp: boolean

  @Column()
  isPrivate: boolean

  @Column({ default: 0 })
  likes: number

  @UpdateDateColumn({ type: 'timestamptz' })
  releasedAt: Date
}
