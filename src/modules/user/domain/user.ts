import { AggregateRoot } from '@nestjs/cqrs'
import * as bcrypt from 'bcrypt'

import { UserCreatedEvent } from '#modules/user/domain/events/user-created.event'

export type UserProfileRequireProperties = Required<{
  readonly id: string
}>

export type UserProfileOptionalProperties = Partial<{
  readonly userId: string
  readonly user: UserProperties | null
  readonly nickname: string
  readonly thumbnail: string
  readonly about: string
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProfileProperties = UserProfileRequireProperties & Required<UserProfileOptionalProperties>

export type UserMetaRequireProperties = Required<{
  readonly id: string
}>

export type UserMetaOptionalProperties = Partial<{
  readonly userId: string
  readonly user: UserProperties | null
  readonly privateContribution: boolean
  readonly emailNotification: boolean
  readonly emailPromotion: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserMetaProperties = UserMetaRequireProperties & Required<UserMetaOptionalProperties>

export type UserRequireProperties = Required<{
  readonly id: string
  readonly email: string
}>

export type UserOptionalProperties = Partial<{
  readonly password: string
  readonly username: string
  readonly profile: UserProfileProperties
  readonly meta: UserMetaProperties
  readonly createdAt: Date
  readonly updatedAt: Date
}>

export type UserProperties = UserRequireProperties & Required<UserOptionalProperties>

export interface User {
  properties: () => UserProperties
  comparePassword: (password: string) => boolean
  create: (password: string) => void
  resetPassword: (password: string) => void
  commit: () => void
}

export class UserImplement extends AggregateRoot implements User {
  private readonly id: string
  private readonly email: string
  private username: string
  private password: string
  private createdAt: Date = new Date()
  private updatedAt: Date = new Date()

  private profileId: string
  private nickname: string
  private thumbnail: string
  private about: string
  private profileCreatedAt: Date
  private profileUpdatedAt: Date

  private metaId: string
  private privateContribution: boolean
  private emailNotification: boolean
  private emailPromotion: boolean
  private metaCreatedAt: Date
  private metaUpdatedAt: Date

  constructor(properties: UserRequireProperties & UserOptionalProperties) {
    super()
    Object.assign(this, properties)
  }

  setProfile(properties: UserProfileRequireProperties & UserProfileOptionalProperties) {
    this.profileId = properties.id
    this.nickname = properties.nickname
    this.thumbnail = properties.thumbnail
    this.about = properties.about
    this.profileCreatedAt = properties.createdAt || new Date()
    this.profileUpdatedAt = properties.updatedAt || new Date()
  }

  setMeta(properties: UserMetaRequireProperties & UserMetaOptionalProperties) {
    this.privateContribution = properties.privateContribution
    this.emailNotification = properties.emailNotification
    this.emailPromotion = properties.emailPromotion
    this.metaCreatedAt = properties.createdAt
    this.metaUpdatedAt = properties.updatedAt
  }

  properties(): UserRequireProperties & Required<UserOptionalProperties> {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      password: this.password,
      profile: {
        id: this.profileId,
        userId: this.id,
        user: null,
        nickname: this.nickname,
        thumbnail: this.thumbnail,
        about: this.about,
        createdAt: this.profileCreatedAt,
        updatedAt: this.profileUpdatedAt,
      },
      meta: {
        id: this.metaId,
        userId: this.id,
        user: null,
        privateContribution: this.privateContribution,
        emailNotification: this.emailNotification,
        emailPromotion: this.emailPromotion,
        createdAt: this.metaCreatedAt,
        updatedAt: this.metaUpdatedAt,
      },
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  create(password: string) {
    this.setPassword(password)
    this.apply(new UserCreatedEvent(this.email, this.username))
  }

  resetPassword(password: string) {
    this.setPassword(password)
    this.updatedAt = new Date()
    // this.apply(new resetPasswordEvent())
  }

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password)
  }

  private setPassword(password: string): void {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync())
  }
}
