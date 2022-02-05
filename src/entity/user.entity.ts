import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string
}
