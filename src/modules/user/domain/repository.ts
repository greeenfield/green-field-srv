import { User } from '#modules/user/domain/user'

export interface UserRepository {
  newId: () => Promise<string>
  save: (user: User) => Promise<void>
  findById: (id: string) => Promise<User>
  findByEmail: (email: string) => Promise<User>
  findAll: () => Promise<User[]>
}
