import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserProfileEntity } from './profile.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @OneToOne(() => UserProfileEntity)
  @JoinColumn()
  profile: UserProfileEntity

  @Column({ length: 255, default: '' })
  username: string

  @Column({ unique: true, length: 255, type: 'varchar', default: '' })
  email: string
}
