import { getRepository } from 'typeorm'

import { AuthTokenRepository } from '#modules/auth/domain/repository'
import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'

export class AuthTokenRepositoryImplement implements AuthTokenRepository {
  async save(entity: AuthTokenEntity): Promise<void> {
    await getRepository(AuthTokenEntity).save(entity)
  }

  async findById(id: string): Promise<AuthTokenEntity> {
    return await getRepository(AuthTokenEntity).findOne(id)
  }
}
