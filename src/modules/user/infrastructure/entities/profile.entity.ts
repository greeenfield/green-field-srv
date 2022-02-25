import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { BaseDate } from '../../../note/infrastructure/entities/baseDate.entity'
import { User } from './user.entity'

@Entity()
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
