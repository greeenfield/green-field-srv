import { User } from '#app/users/infrastructure/entities/user.entity'

export class UserRepository {
  findById: (id: string) => Promise<User>
}
