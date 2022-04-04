import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { NoteMetaEntity } from '#modules/note/infrastructure/entities/noteMeta.entity'
import { TagEntity } from '#modules/note/infrastructure/entities/tag.entity'

@Entity({ name: 'note' })
export class NoteEntity extends BaseEntity {
  @OneToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity

  @Column({ type: 'uuid', nullable: true })
  userId: string

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
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag',
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

  @UpdateDateColumn({ type: 'timestamptz' })
  releasedAt: Date
}
