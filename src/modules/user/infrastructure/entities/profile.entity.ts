import { Column, Entity, OneToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

@Entity({ name: 'user_profile' })
export class UserProfileEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  userId: string

  @OneToOne(() => UserEntity, (user) => user.profile, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity

  @Column({ length: 255, default: '' })
  nickname: string

  @Column({ length: 255, type: 'varchar', default: '' })
  thumbnail: string

  @Column({ default: '' })
  about: string
}
