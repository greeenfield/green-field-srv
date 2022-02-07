import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserService } from './user.service'
import { UserController } from './user.controller'
import { UserRespository } from './user.repository'
import { User } from '../../entity/user.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRespository])],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [UserService, UserRespository],
})
export class UserModule {}
