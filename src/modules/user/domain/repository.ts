import { User } from '#modules/user/domain/user'

export class UserRepository {
  generateId: () => Promise<string>
  save: (user: User) => Promise<void>
  // findById: (id: string) => Promise<User>
  // findByNickname: (nickname: string) => Promise<User>
  // findByEmail: (email: string) => Promise<User>
}
