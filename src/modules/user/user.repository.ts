import { EntityRepository, Repository } from 'typeorm'
import { User } from '../../entity/user.entity'

@EntityRepository(User)
export class UserRespository extends Repository<User> {}
