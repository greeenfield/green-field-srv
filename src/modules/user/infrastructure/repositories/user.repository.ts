import { getRepository, getConnection } from 'typeorm'
import { plainToInstance } from 'class-transformer'
import { Inject } from '@nestjs/common'

import { UserRepository } from '#modules/user/domain/repository'
import { UserFactory } from '#modules/user/domain/factory'
import { User } from '#modules/user/domain/user'
import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'
import { UserProfileEntity } from '#modules/user/infrastructure/entities/profile.entity'

export class UserRepositoryImplement implements UserRepository {
  constructor(@Inject(UserFactory) private readonly userFactory: UserFactory) {}

  async newId(): Promise<string> {
    const user = await getRepository(UserEntity).save(new UserEntity())
    return user.id
  }

  async save(data: User): Promise<void> {
    const profileEntity = plainToInstance(UserProfileEntity, data.properties().profile)

    await Promise.all([
      getRepository(UserEntity).save(this.modelToEntity(data)),
      getRepository(UserProfileEntity).save(profileEntity),
    ])
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await getConnection().createQueryBuilder().update(UserEntity).set({ password }).where('id = :id', { id }).execute()
  }

  async findByEmail(email: string): Promise<User> {
    const userEntitiy = await getRepository(UserEntity).findOne({ where: { email } })

    return this.entityToModel(userEntitiy)
  }

  async findById(id: string): Promise<User> {
    const userEntitiy = await getRepository(UserEntity).findOne(id)

    return this.entityToModel(userEntitiy)
  }

  async findAll(): Promise<User[]> {
    const entityList = await getRepository(UserEntity).find()

    return entityList.map((entity) => this.entityToModel(entity))
  }

  private modelToEntity(model: User): UserEntity {
    return plainToInstance(UserEntity, model.properties())
  }

  private entityToModel(entity: UserEntity): User {
    return this.userFactory.reconstitute(entity)
  }
}
