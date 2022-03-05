import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseDate } from '#modules/note/infrastructure/entities/baseDate.entity'
import { UserProfileEntity } from './profile.entity'

@Entity()
export class UserEntity extends BaseDate {
  @OneToOne(() => UserProfileEntity, (profile) => profile.user)
  @JoinColumn()
  profile: UserProfileEntity

  @Column({ length: 255 })
  username: string

  @Column({ unique: true, length: 255, type: 'varchar' })
  email: string
}
