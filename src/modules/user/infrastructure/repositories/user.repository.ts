import { getRepository } from 'typeorm'
import { Inject } from '@nestjs/common'

import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'
import { User } from '#modules/user/domain/user'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async newId(): Promise<string> {
    const user = await getRepository(UserEntity).save(new UserEntity())
    return user.id
  }

  async save(data: User): Promise<void> {
    await getRepository(UserEntity).save(this.modelToEntity(data))
  }

  async findByEmail(email: string): Promise<User> {
    const userEntitiy = await getRepository(UserEntity).findOne({ where: { email } })

    return this.entityToModel(userEntitiy)
  }

  private modelToEntity(model: User): UserEntity {
    return model.properties()
  }

  private entityToModel(entity: UserEntity): User {
    return this.userFactory.reconstitute(entity)
  }

  // async findById(id: string): Promise<User> {
  //   return
  // }

  // async findByNickname(nickname: string): Promise<User> {
  //   return
  // }
}
