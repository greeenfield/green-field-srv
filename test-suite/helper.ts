import { getRepository } from 'typeorm'
import facker from '@faker-js/faker'
import * as bcrypt from 'bcrypt'

import { UserEntity } from '#modules/user/infrastructure/entities/user.entity'

export const mockUserOnDb = async (): Promise<{ email: string; password: string; id: string }> => {
  const fackData = {
    email: facker.internet.email(),
    password: facker.internet.password(),
    username: facker.internet.userName(),
    profile: {
      nickname: facker.word,
      thumbnail: facker.internet.url,
      about: facker.lorem,
    },
  }

  fackData.password = bcrypt.hashSync(fackData.password, bcrypt.genSaltSync())

  const mockeuUser = Object.assign(new UserEntity(), fackData)

  const { id } = await getRepository(UserEntity).save(mockeuUser)

  return { email: fackData.email, password: fackData.password, id }
}
