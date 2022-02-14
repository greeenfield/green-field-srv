import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'

import { BaseDate } from '../../../notes/infrastructure/entities/baseDate.entity'
import { UserProfile } from './profile.entity'

@Entity()
export class User extends BaseDate {
  @OneToOne(() => UserProfile, (profile) => profile.user)
  @JoinColumn()
  profile: UserProfile

  @Column({ length: 255 })
  username: string

  @Column({ unique: true, length: 255, type: 'varchar' })
  email: string
}
