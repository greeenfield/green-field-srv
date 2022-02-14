import { EntityRepository, Repository } from 'typeorm'
import { User } from '../../app/users/infrastructure/entities/user.entity'

@EntityRepository(User)
export class UserRespository extends Repository<User> {}
