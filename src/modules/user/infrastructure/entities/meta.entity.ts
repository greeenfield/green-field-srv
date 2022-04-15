import { Column, Entity, OneToOne, JoinColumn } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

@Entity({ name: 'user_meta' })
export class UserMetaEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  userId: string

  @OneToOne(() => UserEntity, (user) => user.meta, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity

  @Column({ default: false })
  privateContribution: boolean

  @Column({ default: false })
  emailNotification: boolean

  @Column({ default: false })
  emailPromotion: boolean
}
