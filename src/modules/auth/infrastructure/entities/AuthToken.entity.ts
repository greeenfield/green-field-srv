import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'

import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { BaseEntity } from '#shared/entity/base.entity'

@Entity({ name: 'auth_token' })
export class AuthTokenEntity extends BaseEntity {
  @Column({ type: 'uuid', nullable: true })
  userId: string

  @ManyToOne(() => UserEntity, (user) => user.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: UserEntity

  @Column({ default: false })
  disabled: boolean
}
