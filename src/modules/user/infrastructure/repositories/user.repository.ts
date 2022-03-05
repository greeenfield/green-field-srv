import { getRepository, In } from 'typeorm'
import { Inject } from '@nestjs/common'

import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'
import { User } from '#modules/user/domain/user'

import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async generateId(): Promise<string> {
    const emptyEntity = new UserEntity()
    const entity = await getRepository(UserEntity).save(emptyEntity)
    return entity.id
  }

  async save(data: User): Promise<void> {
    await getRepository(UserEntity).save(data.properties())
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
