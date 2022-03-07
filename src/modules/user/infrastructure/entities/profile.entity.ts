import { Column, Entity } from 'typeorm'

import { BaseEntity } from '#modules/note/infrastructure/entities/base.entity'

@Entity('profile')
export class UserProfileEntity extends BaseEntity {
  @Column({ length: 255 })
  nickname!: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail!: string

  @Column('text')
  about!: string
}
