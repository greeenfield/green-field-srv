import { User } from '#modules/user/domain/user'

export interface UserRepository {
  newId: () => Promise<string>
  save: (user: User) => Promise<void>
  updatePassword: (id: string, password: string) => Promise<void>
  findById: (id: string) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findAll: () => Promise<User[]>
  updateContributionSetting: (userId: string, privateContribution: boolean) => Promise<void>
}
