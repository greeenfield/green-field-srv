import { UpdateResult } from 'typeorm'
import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'

export interface AuthTokenRepository {
  newId: () => Promise<string>
  save: (entity: AuthTokenEntity) => Promise<void>
  findById: (id: string) => Promise<AuthTokenEntity>
  updateDisabled: (id: string) => Promise<UpdateResult>
}
