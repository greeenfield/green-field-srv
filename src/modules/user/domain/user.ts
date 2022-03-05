import { AggregateRoot } from '@nestjs/cqrs'

export type UserRequireProperties = Required<{
  readonly id: string
  readonly username: string
  readonly nickname: string
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
  private readonly id: string
  private readonly username: string
  private readonly nickname: string
  private readonly email: string

  constructor(properties: UserRequireProperties & UserOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties(): UserProperties {
    return {
      id: this.id,
      username: this.username,
      nickname: this.nickname,
      email: this.email,
    }
  }

  async create(properties: UserProperties): Promise<void> {
    console.log(properties)
    return
  }
}
