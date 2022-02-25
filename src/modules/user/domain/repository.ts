import { User } from '#modules/user/infrastructure/entities/user.entity'

export class UserRepository {
  findById: (id: string) => Promise<User>
}
