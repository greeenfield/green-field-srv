import { Column, Entity } from 'typeorm'

import { BaseEntity } from '#shared/entity/base.entity'
import { replaceSpace } from '#shared/utils/snippets/stringValidator'

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @Column({ length: 255, default: '' })
  name: string

  @Column({ nullable: true, type: 'text' })
  description: string | null

  static build(name: string, description?: string): TagEntity {
    const tag = new TagEntity()
    tag.name = replaceSpace(name)
    tag.description = description || null

    return tag
  }
}
