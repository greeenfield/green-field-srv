import { getRepository, getConnection, UpdateResult } from 'typeorm'

import { AuthTokenRepository } from '#modules/auth/domain/repository'
import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'

export class AuthTokenRepositoryImplement implements AuthTokenRepository {
  async newId(): Promise<string> {
    const authToken = await getRepository(AuthTokenEntity).save(new AuthTokenEntity())
    return authToken.id
  }

  async save(entity: AuthTokenEntity): Promise<void> {
    await getRepository(AuthTokenEntity).save(entity)
  }

  async findById(id: string): Promise<AuthTokenEntity> {
    return await getRepository(AuthTokenEntity).findOne(id)
  }

  async updateDisabled(id: string): Promise<UpdateResult> {
    return await getConnection()
      .createQueryBuilder()
      .update(AuthTokenEntity)
      .set({ disabled: true, updatedAt: new Date() })
      .where('id = :id', { id })
      .execute()
  }
}
