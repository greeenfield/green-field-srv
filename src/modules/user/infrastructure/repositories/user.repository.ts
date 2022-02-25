import { UserRepository } from '#modules/user/domain/repository'

export class UserRepositoryImplement implements UserRepository {
  async findById(id: string): Promise<User> {
    return
  }
}
