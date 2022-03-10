import { AggregateRoot } from '@nestjs/cqrs'

export type UserProfileRequireProperties = Required<{
  readonly id: string
}>

export type UserProfileOptionalProperties = Partial<{
  readonly nickname: string
  readonly thumbnail: string
  readonly about: string
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProfileProperties = UserProfileRequireProperties & Required<UserProfileOptionalProperties>

export type UserRequireProperties = Required<{
  readonly id: string
  readonly email: string
}>

export type UserOptionalProperties = Partial<{
  readonly username: string
  readonly profile: UserProfileProperties
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProperties = UserRequireProperties & Required<UserOptionalProperties>

export interface User {
  properties: () => UserProperties
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string
  private readonly email: string
  private username = ''
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()

  private profileId: string
  private nickname = ''
  private thumbnail = ''
  private about = ''
  private profileCreatedAt: Date = new Date()
  private profileUpdatedAt: Date = new Date()

  constructor(properties: UserRequireProperties & UserOptionalProperties) {
    super()

    this.id = properties.id
    this.email = properties.email
    this.username = properties.username
    this.createdAt = properties.createdAt
    this.updatedAt = properties.updatedAt

    this.profileId = properties.profile.id
    this.nickname = properties.profile.nickname
    this.thumbnail = properties.profile.thumbnail
    this.about = properties.profile.about
    this.profileCreatedAt = properties.profile.createdAt
    this.profileUpdatedAt = properties.profile.updatedAt
  }

  setProfile(properties: UserProfileRequireProperties & UserProfileOptionalProperties) {
    this.profileId = properties.id
    this.nickname = properties.nickname
    this.thumbnail = properties.thumbnail
    this.about = properties.about
    this.profileCreatedAt = properties.createdAt
    this.profileUpdatedAt = properties.updatedAt
  }

  properties(): UserProperties {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      profile: {
        id: this.profileId,
        nickname: this.nickname,
        thumbnail: this.thumbnail,
        about: this.about,
        createdAt: this.profileCreatedAt,
        updatedAt: this.profileUpdatedAt,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
