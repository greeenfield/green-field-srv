import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseDate } from '#modules/note/infrastructure/entities/baseDate.entity'
import { UserEntity } from './user.entity'

@Entity()
export class UserProfileEntity extends BaseDate {
  @OneToOne(() => UserEntity, (user) => user.profile)
  @JoinColumn()
  user: UserEntity

  @Column({ length: 255 })
  nickname: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column('text')
  about: string
}
