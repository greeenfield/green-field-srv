import { AggregateRoot } from '@nestjs/cqrs'

export type UserRequireProperties = Required<{
  readonly id: string
  readonly username: string
  readonly email: string
}>

export type UserOptionalProperties = Partial<{
  readonly nickname: string
  readonly password: string
  readonly thumbnail: string
  readonly about: string
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProperties = UserRequireProperties & UserOptionalProperties

export interface User {
  properties: () => UserProperties
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string
  private readonly username: string
  private email: string
  private nickname: string | null = null
  private password: string | null = null
  private thumbnail: string | null = null
  private about: string | null = null
  private readonly createdAt: Date = new Date()
  private readonly updatedAt: Date = new Date()

  constructor(properties: UserRequireProperties & UserOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  properties() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      profile: {
        id: '',
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        nickname: this.nickname,
        password: this.password,
        thumbnail: this.thumbnail,
        about: this.about,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
