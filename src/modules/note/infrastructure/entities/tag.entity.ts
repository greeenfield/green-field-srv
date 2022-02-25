import { Column, Entity } from 'typeorm'

import { BaseDate } from './baseDate.entity'

@Entity()
export class Tag extends BaseDate {
  @Column({ length: 255 })
  name: string

  @Column({ length: 255, nullable: true, type: 'varchar' })
  description: string | null
}
