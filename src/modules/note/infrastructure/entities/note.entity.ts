import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UrlMetaEntity } from '#modules/note/infrastructure/entities/urlMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

@Entity({ name: 'note' })
export class NoteEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({ type: 'uuid', nullable: true })
  userId: string

  @OneToMany(() => UrlMetaEntity, (urlMeta) => urlMeta.note, { cascade: true })
  urlMetas: UrlMetaEntity[]

  @Column({ length: 255, default: '' })
  title: string

  @Column({ type: 'text', default: '' })
  body: string

  @Column({ default: '' })
  thumbnail: string

  @ManyToMany(() => TagEntity)
  @JoinTable({
    name: 'note_tags',
    joinColumn: {
      name: 'note_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  tags: TagEntity[]

  @Column({ default: true })
  isTemp: boolean

  @Column({ default: true })
  isPrivate: boolean

  @Column({ default: 0 })
  likes: number

  @UpdateDateColumn({ type: 'timestamptz', nullable: true })
  releasedAt: Date
}
