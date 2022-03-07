import { getRepository } from 'typeorm'
import { Inject } from '@nestjs/common'

import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'
import { User } from '#modules/user/domain/user'

import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async generateId(): Promise<string> {
    const entity = await getRepository(UserEntity).save(new UserEntity())
    return entity.id
  }

  async save(data: User): Promise<void> {
    await getRepository(UserEntity).save(this.modelToEntity(data))
  }

  private modelToEntity(model: User): UserEntity {
    // return { ...model.properties() }
    return {
      id: '',
      profile: { id: '', nickname: '', thumbnail: '', about: '', createdAt: new Date(), updatedAt: new Date() },
      username: '',
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
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
