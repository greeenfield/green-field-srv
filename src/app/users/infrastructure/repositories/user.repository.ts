import { UserRepository } from '#app/users/domain/repository'

export class UserRepositoryImplement implements UserRepository {
  async findById(id: string): Promise<User> {
    return
  }
}
