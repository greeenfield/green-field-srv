import { Column, Entity } from 'typeorm'

import { BaseEntity } from './base.entity'

@Entity()
export class Tag extends BaseEntity {
  @Column({ length: 255 })
  name: string

  @Column({ length: 255, nullable: true, type: 'varchar' })
  description: string | null
}
