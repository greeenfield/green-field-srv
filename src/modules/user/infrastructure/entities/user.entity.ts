import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseEntity } from '#modules/note/infrastructure/entities/base.entity'
import { UserProfileEntity } from './profile.entity'

@Entity()
export class UserEntity extends BaseEntity {
  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity

  @Column({ length: 255 })
  username: string

  @Column({ unique: true, length: 255, type: 'varchar' })
  email: string
}
