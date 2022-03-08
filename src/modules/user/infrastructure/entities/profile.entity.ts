import { Column, Entity } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'

@Entity({ name: 'user_profile' })
export class UserProfileEntity extends BaseEntity {
  @Column({ length: 255 })
  nickname: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column('text')
  about: string
}
