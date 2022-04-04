import { Column, Entity } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ length: 255 })
  name: string

  @Column({ length: 255, nullable: true, type: 'varchar' })
  description: string | null
}
