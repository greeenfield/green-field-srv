import { getRepository, Db } from 'typeorm'
import { Inject } from '@nestjs/common'

import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'
import { User } from '#modules/user/domain/user'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UserProfileEntity } from '../entities/profile.entity'

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async newId(): Promise<string> {
    const user = await getRepository(UserEntity).save(new UserEntity())
    console.log(user.id)
    return user.id
  }

  async save(data: User): Promise<void> {
    const user = await getRepository(UserEntity).save(new UserEntity())
    const profile = new UserProfileEntity()
    user.profile = profile
    await getRepository(UserEntity).save(user)
  }

  private modelToEntity(model: User): UserEntity {
    return
  }

  // async findById(id: string): Promise<User> {
  //   return
  // }

  // async findByNickname(nickname: string): Promise<User> {
  //   return
  // }

  // async findByEmail(email: string): Promise<User> {
  //   return
  // }
}
