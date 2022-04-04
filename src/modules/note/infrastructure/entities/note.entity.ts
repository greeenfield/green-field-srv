import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { NoteMetaEntity } from '#modules/note/infrastructure/entities/noteMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

@Entity({ name: 'note' })
export class NoteEntity extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity

  @OneToMany(() => NoteMetaEntity, (noteMeta) => noteMeta.note)
  @JoinColumn()
  noteMetas: NoteMetaEntity[]

  @Column({ length: 255 })
  title: string

  @Column('text')
  body: string

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'note_tags',
    joinColumn: {
      name: 'note',
    },
    inverseJoinColumn: {
      name: 'tag',
    },
  })
  tags: TagEntity[]

  @Column()
  isTemp: boolean

  @Column()
  isPrivate: boolean

  @Column({ default: 0 })
  likes: number

  @UpdateDateColumn({ type: 'timestamptz' })
  releasedAt: Date
}
