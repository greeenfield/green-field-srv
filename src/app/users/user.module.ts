import { CqrsModule } from '@nestjs/cqrs'
import { Module, Provider } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserController } from '../../modules/user/user.controller'

const infrastructure = []

const application = []

const domain = []

@Module({
  imports: [CqrsModule],
  exports: [TypeOrmModule],
  controllers: [UserController],
  providers: [...infrastructure, ...application, ...domain],
})
export class UserModule {}
