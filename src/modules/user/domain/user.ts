import { AggregateRoot } from '@nestjs/cqrs'

import { UserProfile } from '#modules/user/infrastructure/entities/profile.entity'

export type UserRequireProperties = Required<{
  readonly id: number
  readonly username: string
  readonly email: string
}>

export type UserOptionalProperties = Partial<{
  gender: string
}>

export type UserProperties = UserRequireProperties & UserOptionalProperties

export interface User {
  properties: () => UserProperties
  create: (properties: UserProperties) => Promise<void>
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: number
  private readonly username: string
  private readonly email: string

  constructor(properties: UserRequireProperties & UserOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties(): UserProperties {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    }
  }

  async create(properties: UserProperties): Promise<void> {
    console.log(properties)
    return
  }
}
