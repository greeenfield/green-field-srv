import { UserRepository } from '#modules/user/domain/repository'
import { User } from '#modules/user/domain/user'

export class UserRepositoryImplement implements UserRepository {
  async findById(id: string): Promise<User> {
    return
  }
}
