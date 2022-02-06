import { Column, JoinColumn, OneToOne } from 'typeorm'
import { BaseDate } from './baseDate.entity'
import { User } from './user.entity'

export class UserProfile extends BaseDate {
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User

  @Column({ length: 255 })
  nickname: string

  @Column({ length: 255, type: 'varchar' })
  thumbnail: string

  @Column('text')
  about: string
}
