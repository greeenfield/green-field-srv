import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UrlMetaEntity } from '#modules/note/infrastructure/entities/UrlMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

@Entity({ name: 'note' })
export class NoteEntity extends BaseEntity {
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity

  @Column({ type: 'uuid', nullable: true })
  userId: string

  @OneToMany(() => UrlMetaEntity, (urlMeta) => urlMeta.note)
  urlMetas: UrlMetaEntity[]

  @Column({ length: 255, default: '' })
  title: string

  @Column({ type: 'text', default: '' })
  body: string

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'note_tags',
    joinColumn: {
      name: 'noteId',
    },
    inverseJoinColumn: {
      name: 'tagId',
    },
  })
  tags: TagEntity[]

  @Column({ default: true })
  isTemp: boolean

  @Column({ default: true })
  isPrivate: boolean

  @Column({ default: 0 })
  likes: number

  @UpdateDateColumn({ type: 'timestamptz' })
  releasedAt: Date
}
