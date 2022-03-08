import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { NoteMeta } from '#modules/note/infrastructure/entities/noteMeta.entity'
import { Tag } from '#modules/note/infrastructure/entities/tag.entity'

@Entity()
export class Note extends BaseEntity {
  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity

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
