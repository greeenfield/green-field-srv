import { AuthTokenEntity } from '#modules/auth/infrastructure/entities/AuthToken.entity'

export interface AuthTokenRepository {
  save: (entity: AuthTokenEntity) => Promise<void>
  findById: (id: string) => Promise<AuthTokenEntity>
}
