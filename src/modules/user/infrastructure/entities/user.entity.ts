import { Column, Entity, OneToOne } from 'typeorm'

import { UserProfileEntity } from '#modules/user/infrastructure/entities/profile.entity'
import { BaseEntity } from '#shared/entity/base.entity'

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @OneToOne(() => UserProfileEntity, (profile) => profile.user)
  profile: UserProfileEntity

  @Column({ length: 255, default: '' })
  username: string

  @Column({ length: 255, type: 'varchar', default: '' })
  email: string
}
